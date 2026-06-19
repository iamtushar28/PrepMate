import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase-admin";
import { createInterviewId } from "@/lib/interview-id";
import { FieldValue } from "firebase-admin/firestore";
import { ai } from "@/lib/gemini";

export async function POST(req: NextRequest) {
    try {
        console.log("1. Generate interview route called");

        const authHeader =
            req.headers.get("authorization");

        if (!authHeader?.startsWith("Bearer ")) {
            console.log(
                "2. Missing authorization header"
            );

            return NextResponse.json(
                {
                    error:
                        "Please login to generate an interview",
                },
                {
                    status: 401,
                }
            );
        }

        const token =
            authHeader.split("Bearer ")[1];

        console.log(
            "3. Token received:",
            !!token
        );

        let decodedToken;

        try {
            console.log(
                "4. Verifying Firebase token"
            );

            decodedToken =
                await adminAuth.verifyIdToken(
                    token
                );

            console.log(
                "5. Token verified:",
                decodedToken.uid
            );
        } catch (error) {
            console.error(
                "Firebase Auth Error:",
                error
            );

            return NextResponse.json(
                {
                    error:
                        "Please login to generate an interview",
                },
                {
                    status: 401,
                }
            );
        }

        const { jobDescription, resume } =
            await req.json();

        console.log(
            "6. Request body parsed"
        );

        const prompt = `
Generate a personalized mock interview.

Job Description:
${jobDescription}

Candidate Resume:
${JSON.stringify(resume)}

Rules:
- If resume exists, infer candidate experience from skills, projects, internships, and work experience.
- Otherwise infer experience level from the job description.
- Match question difficulty naturally to the inferred experience level.
- Questions must be under 15 words.
- Use natural spoken interview language.
- Avoid long context before the question.
- Reference project names only when relevant.
- Generate:
  - 5 technical questions
  - 3 project questions
  - 2 behavioral questions
- Keep questions concise and conversational.
- No explanations.
- Return only valid JSON.

Format:
{
  "estimatedLevel": "",
  "technical": ["question"],
  "project": ["question"],
  "behavioral": ["question"]
}
`;

        console.log(
            "7. Calling Gemini"
        );

        const result =
            await ai.models.generateContent({
                model: "gemini-2.5-flash-lite",
                contents: prompt,
            });

        console.log(
            "8. Gemini response received"
        );

        const text =
            result.text
                ?.replace(/```json/g, "")
                .replace(/```/g, "")
                .trim() || "{}";

        console.log(
            "9. Gemini raw response:",
            text
        );

        let generated;

        try {
            generated = JSON.parse(text);

            console.log(
                "10. JSON parsed successfully"
            );
        } catch (error) {
            console.error(
                "JSON Parse Error:",
                error
            );

            console.error(
                "Invalid Gemini Response:",
                text
            );

            return NextResponse.json(
                {
                    error:
                        "Gemini returned invalid JSON",
                    response: text,
                },
                {
                    status: 500,
                }
            );
        }

        const interviewId =
            createInterviewId(
                generated.estimatedLevel ||
                    "software-engineer"
            );

        console.log(
            "11. Interview ID created:",
            interviewId
        );

        console.log(
            "12. Writing interview to Firestore"
        );

        await adminDb
            .collection("interviews")
            .doc(interviewId)
            .set({
                id: interviewId,

                userId: decodedToken.uid,

                status: "created",

                estimatedLevel:
                    generated.estimatedLevel,

                questions: {
                    technical:
                        generated.technical ||
                        [],
                    project:
                        generated.project || [],
                    behavioral:
                        generated.behavioral ||
                        [],
                },

                evaluation: null,

                createdAt:
                    FieldValue.serverTimestamp(),

                startedAt: null,

                completedAt: null,
            });

        console.log(
            "13. Firestore write successful"
        );

        return NextResponse.json({
            interviewId,
        });
    } catch (error: any) {
        console.error(
            "UNHANDLED ERROR:"
        );
        console.error(error);
        console.error(error?.message);
        console.error(error?.stack);

        return NextResponse.json(
            {
                error:
                    error?.message ||
                    "Failed to create interview",
            },
            {
                status: 500,
            }
        );
    }
}