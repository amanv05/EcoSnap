import { GoogleGenAI, Type } from "@google/genai";
const GEMINI_API = process.env.GEMINI_API;

const ai = new GoogleGenAI({ apiKey: GEMINI_API as string });

interface RecyclingData {
  category: string;
  isRecyclable: boolean;
  recyclingTip: string;
}

async function tipsGenerate(objectName: string): Promise<RecyclingData> {
  const recyclingSchema = {
    type: Type.OBJECT,
    properties: {
      category: {
        type: Type.STRING,
      },
      isRecyclable: {
        type: Type.BOOLEAN,
      },
      recyclingTip: {
        type: Type.STRING,
      },
    },
    propertyOrdering: ["category", "isRecyclable", "recyclingTip"],
    required: ["category", "isRecyclable", "recyclingTip"],
  };

  const prompt = `provide category of this object and tell it is recyclable or not and give recycling tip for it ${objectName}`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: recyclingSchema,
      temperature: 0.1,
    },
  });

  try {
    const parseData: RecyclingData = JSON.parse(response.text as string);
    return parseData;
  } catch (e) {
    console.error("Error while parsing the response: ", e);

    return {
      category: "Error",
      isRecyclable: false,
      recyclingTip: "Could not process information",
    } as RecyclingData;
  }
}

export default tipsGenerate;
