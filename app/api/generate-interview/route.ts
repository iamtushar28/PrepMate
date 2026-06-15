import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: NextRequest) {
    try {
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
                .trim() || "[]";

        const questions = JSON.parse(text);

        return NextResponse.json(questions);
    }
    catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                error:
                    "Failed to generate interview questions",
            },
            {
                status: 500,
            }
        );
    }
}