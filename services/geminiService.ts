
import { GoogleGenAI, Type } from "@google/genai";
import { Reflection } from "../types";

const API_KEY = process.env.API_KEY || "";

export const getGeminiClient = () => {
  if (!API_KEY) {
    console.error("API Key not found in environment.");
  }
  return new GoogleGenAI({ apiKey: API_KEY });
};

export async function generateReflection(mood: string): Promise<Reflection> {
  const ai = getGeminiClient();
  const prompt = `Gere uma reflexão espiritual curta e poderosa (em português) baseada no tema de "proteção espiritual" e "vitória sobre as trevas", considerando que o usuário está se sentindo: ${mood}. 
  O tom deve ser encorajador, bíblico e majestoso.
  Retorne em formato JSON.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "Título da reflexão" },
          body: { type: Type.STRING, description: "Conteúdo da reflexão (parágrafo único)" },
          verse: { type: Type.STRING, description: "Um versículo bíblico relacionado" },
        },
        required: ["title", "body", "verse"]
      }
    }
  });

  return JSON.parse(response.text);
}

export async function generatePrayer(intention: string): Promise<string> {
  const ai = getGeminiClient();
  const prompt = `Escreva uma oração de guerra espiritual poderosa e personalizada para a seguinte intenção: "${intention}". 
  Use uma linguagem que demonstre autoridade espiritual e confiança na vitória divina, no estilo: "Aqui não, Satanás. Esta vida pertence a Deus". 
  A oração deve ter cerca de 100-150 palavras.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  return response.text || "Não foi possível gerar a oração no momento. Tente novamente.";
}

export async function generateVisualShield(fear: string): Promise<string | null> {
  const ai = getGeminiClient();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          text: `Uma representação visual majestosa e sagrada de proteção divina e vitória sobre o medo de "${fear}". 
          A imagem deve mostrar luz brilhante expulsando sombras escuras, estilo cinematográfico épico, alta resolução, raios dourados, atmosfera de paz e triunfo celestial.`,
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1"
      }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
}
