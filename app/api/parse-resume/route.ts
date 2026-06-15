import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("resume") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Resume file is required" },
        { status: 400 }
      );
    }

    // Validate PDF
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are allowed" },
        { status: 400 }
      );
    }

    // Validate size (5MB)
    const MAX_SIZE = 5 * 1024 * 1024;

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Resume must be under 5MB" },
        { status: 400 }
      );
    }

    // Convert PDF to base64
    const bytes = await file.arrayBuffer();

    const base64Pdf = Buffer.from(bytes).toString("base64");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          inlineData: {
            mimeType: "application/pdf",
            data: base64Pdf,
          },
        },
        `
        Parse this resume and return ONLY valid JSON.

        {
          "name": "",
          "email": "",
          "phone": "",
          "summary": "",
          "skills": [],
          "experience": [],
          "education": [],
          "projects": []
        }

        Do not return markdown.
        Do not wrap in \`\`\`json.
        Return only raw JSON.
        `,
      ],
    });

    const text = response.text?.trim() || "{}";

    const parsedResume = JSON.parse(text);

    return NextResponse.json(parsedResume);
  } catch (error) {
    console.error("Resume Parsing Error:", error);

    return NextResponse.json(
      { error: "Failed to parse resume" },
      { status: 500 }
    );
  }
}