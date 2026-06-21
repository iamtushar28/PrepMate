export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase-admin";
import { createInterviewId } from "@/lib/interview-id";
import { FieldValue } from "firebase-admin/firestore";
import { ai } from "@/lib/gemini";

export async function POST(req: NextRequest) {
    try {
        const authHeader =
            req.headers.get("authorization");

        if (!authHeader?.startsWith("Bearer ")) {
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

        let decodedToken;

        try {
            decodedToken =
                await adminAuth.verifyIdToken(
                    token
                );
        } catch {
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
estimatedLevel should be the most likely target role inferred from the job description and candidate profile.
`;

        const result =
            await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
            });

        const text =
            result.text
                ?.replace(/```json/g, "")
                .replace(/```/g, "")
                .trim() || "{}";

        const generated =
            JSON.parse(text);

        const interviewId =
            createInterviewId(
                generated.estimatedLevel ||
                    "software-engineer"
            );

            const totalQuestions =
    (generated.technical?.length || 0) +
    (generated.project?.length || 0) +
    (generated.behavioral?.length || 0);

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
                generated.technical || [],
            project:
                generated.project || [],
            behavioral:
                generated.behavioral || [],
        },

        currentQuestionIndex: 0,

        totalQuestions,

        lastActivityAt: null,

        evaluation: null,

        createdAt:
            FieldValue.serverTimestamp(),

        startedAt: null,

        completedAt: null,
    });

        return NextResponse.json({
            interviewId,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                error:
                    "Failed to create interview",
            },
            {
                status: 500,
            }
        );
    }
}