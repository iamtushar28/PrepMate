import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey:
        process.env.GEMINI_API_KEY!,
});

export async function POST(
    request: Request
) {
    try {
        const body =
            await request.json();

        const {
            question,
            answer,
        } = body;

        const response =
            await ai.models.generateContent({
                model:
                    "gemini-2.5-flash",

                contents: `
You are an interviewer.

Question:
${question}

Candidate Answer:
${answer}

Respond in ONE short sentence.

Example:
"Good answer. Let's continue."

Do not evaluate deeply.
Do not ask another question.
`,
            });

        return Response.json({
            success: true,

            acknowledgement:
                response.text,
        });
    } catch (error) {
        console.error(error);

        return Response.json(
            {
                success: false,
            },
            {
                status: 500,
            }
        );
    }
}