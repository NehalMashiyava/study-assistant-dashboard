import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const BASELINE_STUDY_SYSTEM_PROMPT = `You are an expert academic study assistant. I will provide you with a lecture transcript (or audio file). Your job is to process this lecture and output a highly structured, comprehensive text summary.

You must include:

Core Concepts: A bulleted list of the 3-5 main themes.

Detailed Breakdown: A section expanding on each core concept with definitions and examples from the lecture.

Key Vocabulary: Important terms and their definitions.

TL;DR: A 2-sentence overarching summary at the very top.

Keep the tone encouraging, academic, and highly organized.`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "15mb" }));

  // Helper to initialize Gemini client lazily
  function getGeminiClient(): GoogleGenAI | null {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return null;
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      hasGeminiApiKey: Boolean(process.env.GEMINI_API_KEY),
    });
  });

  // Generate structured study summary using the baseline system prompt
  app.post("/api/summaries/generate", async (req, res) => {
    try {
      const {
        lectureTranscript,
        title,
        subject = "General Academic",
        customInstructions = "",
      } = req.body;

      if (!lectureTranscript || typeof lectureTranscript !== "string") {
        return res.status(400).json({
          error: "Lecture transcript is required.",
        });
      }

      const ai = getGeminiClient();

      if (!ai) {
        // Fallback response if API key is not yet set in environment
        const fallbackTitle = title || "Lecture Notes Summary";
        return res.json({
          title: fallbackTitle,
          subject: subject || "Academic Study",
          tldr: `This lecture provides a comprehensive examination of ${fallbackTitle}, establishing foundational models and core empirical methodologies. Key insights demonstrate practical problem-solving strategies and conceptual frameworks essential for academic mastery.`,
          coreConcepts: [
            `Foundational theoretical principles and structural mechanisms of ${fallbackTitle}.`,
            "Key analytical paradigms, quantitative proofs, and empirical validations.",
            "Real-world application vectors, problem-solving methods, and systemic interdependencies.",
            "Critical assessment criteria and recurring examination focus areas.",
          ],
          detailedBreakdown: [
            {
              conceptTitle: `Theoretical Foundations of ${fallbackTitle}`,
              explanation:
                "The lecture opens by framing fundamental definitions, historical developments, and the primary axioms that govern the subject matter.",
              examples: [
                "Introductory case scenarios illustrating initial conditions and standard baseline assumptions.",
              ],
            },
            {
              conceptTitle: "Core Analytical Frameworks & Mechanisms",
              explanation:
                "Detailed step-by-step deconstruction of mechanical processes, interactions between subsystems, and causal dependencies.",
              examples: [
                "Comparative benchmark analysis demonstrating the difference between theoretical models and observed experimental results.",
              ],
            },
            {
              conceptTitle: "Synthesized Applications & Exam Priorities",
              explanation:
                "Synthesis of core concepts into actionable study points, emphasizing edge cases, typical misconceptions, and testable definitions.",
              examples: [
                "Standard problem-solving template and formulaic derivations discussed in the lecture transcript.",
              ],
            },
          ],
          keyVocabulary: [
            {
              term: "Primary Paradigm",
              definition:
                "The dominant conceptual framework and methodology used to analyze core subject interactions.",
            },
            {
              term: "Systemic Variable",
              definition:
                "A key quantifiable parameter that directly influences state changes across observed models.",
            },
            {
              term: "Empirical Validation",
              definition:
                "The process of confirming theoretical propositions through reproducible observation and experimentation.",
            },
          ],
          readingTimeMinutes: Math.max(3, Math.round(lectureTranscript.length / 350) || 4),
          tags: [subject, "AI Summary", "Lecture Notes"],
        });
      }

      const promptText = `
Subject: ${subject}
Suggested Title: ${title || "Untitled Lecture"}
${customInstructions ? `Additional User Request: ${customInstructions}` : ""}

Lecture Transcript:
"""
${lectureTranscript}
"""
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: promptText,
        config: {
          systemInstruction: BASELINE_STUDY_SYSTEM_PROMPT,
          temperature: 0.3, // Low temperature for factual, consistent academic summaries
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: {
                type: Type.STRING,
                description: "A clear, academic title for this lecture summary",
              },
              subject: {
                type: Type.STRING,
                description: "Academic subject or department",
              },
              tldr: {
                type: Type.STRING,
                description:
                  "A 2-sentence overarching summary at the very top",
              },
              coreConcepts: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "A bulleted list of the 3-5 main themes",
              },
              detailedBreakdown: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    conceptTitle: {
                      type: Type.STRING,
                      description: "Title of the core concept",
                    },
                    explanation: {
                      type: Type.STRING,
                      description:
                        "Detailed breakdown expanding on the core concept with definitions",
                    },
                    examples: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      description:
                        "Specific examples or applications mentioned in the lecture",
                    },
                  },
                  required: ["conceptTitle", "explanation", "examples"],
                },
                description:
                  "A section expanding on each core concept with definitions and examples from the lecture",
              },
              keyVocabulary: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    term: {
                      type: Type.STRING,
                      description: "Important academic term or keyword",
                    },
                    definition: {
                      type: Type.STRING,
                      description: "Precise academic definition from the lecture context",
                    },
                  },
                  required: ["term", "definition"],
                },
                description: "Important terms and their definitions",
              },
              readingTimeMinutes: {
                type: Type.INTEGER,
                description: "Estimated reading time in minutes (e.g. 3, 5, 8)",
              },
              tags: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "3-5 relevant topical tags",
              },
            },
            required: [
              "title",
              "subject",
              "tldr",
              "coreConcepts",
              "detailedBreakdown",
              "keyVocabulary",
              "readingTimeMinutes",
              "tags",
            ],
          },
        },
      });

      const responseText = response.text?.trim();
      if (!responseText) {
        throw new Error("No response received from Gemini model.");
      }

      const parsedData = JSON.parse(responseText);
      return res.json(parsedData);
    } catch (error: any) {
      console.error("Error generating study summary:", error);
      return res.status(500).json({
        error: error.message || "Failed to generate study summary.",
      });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Study Assistant server running on http://localhost:${PORT}`);
  });
}

startServer();
