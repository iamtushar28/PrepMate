import { NextRequest, NextResponse } from "next/server";
import { ai } from "@/lib/gemini";

function extractJson(text: string) {
  const cleaned = text
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "");

  return JSON.parse(cleaned);
}

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

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are allowed" },
        { status: 400 }
      );
    }

    const MAX_SIZE = 5 * 1024 * 1024; // 5MB

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Resume must be under 5MB" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const base64Pdf = Buffer.from(bytes).toString("base64");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: [
        {
          inlineData: {
            mimeType: "application/pdf",
            data: base64Pdf,
          },
        },
        `
Parse this resume and return the following JSON structure.

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

Return only JSON.
`,
      ],
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text?.trim() || "{}";

    let parsedResume;

    try {
      parsedResume = extractJson(text);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);

      return NextResponse.json(
        {
          error: "Invalid JSON returned by Gemini",
          rawResponse: text,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(parsedResume);
  } catch (error) {
    console.error("Resume Parsing Error:", error);

    return NextResponse.json(
      { error: "Failed to parse resume" },
      { status: 500 }
    );
  }
}
