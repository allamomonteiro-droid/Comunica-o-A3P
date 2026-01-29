
import { GoogleGenAI, Type } from "@google/genai";
import { CommunicationEntry } from "../types";

export async function getStrategicInsights(data: CommunicationEntry[]) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `Analise os seguintes dados de governança de comunicação interna e forneça 3 insights estratégicos e 3 sugestões de melhoria para o RH. 
  Considere canais, objetivos e efetividade.
  
  Dados: ${JSON.stringify(data.map(d => ({ 
    canal: d.channel, 
    objetivo: d.objective, 
    tipo: d.type, 
    compreensao: d.isComprehended,
    retorno: d.returnIndicator
  })))}
  
  Responda em JSON.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            insights: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["insights", "suggestions"]
        }
      }
    });

    const result = JSON.parse(response.text);
    return result;
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return {
      insights: ["Dados insuficientes para análise profunda.", "Destaque para o uso de canais digitais.", "Monitorar o retorno de feedbacks."],
      suggestions: ["Padronizar os KPIs de retorno.", "Diversificar os canais para o público operacional.", "Realizar auditorias periódicas."]
    };
  }
}
