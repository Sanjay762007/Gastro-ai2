import { GoogleGenAI, Type } from "@google/genai";

// Initialize the GoogleGenAI client with the API key from environment variables as required.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSmartInsights = async (dataContext: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a sales performance consultant specializing in the Indian restaurant industry. 
      Based on the following sales data (in ₹), provide 3 actionable insights to increase revenue and order volume.
      Focus on regional tastes, festive sales peaks, and average ticket size growth.
      Data Summary: ${dataContext}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              impact: { type: Type.STRING, description: "High, Medium, or Low impact on sales" }
            },
            required: ["title", "description", "impact"]
          }
        }
      }
    });
    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
};

export const getExecutiveReport = async (fullDataContext: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `You are Agent Gastro, a premier Sales Analyst for the Bharat market. 
      Provide an executive strategic summary based EXCLUSIVELY on sales and revenue metrics in Indian Rupees (₹).
      Ignore maintenance and occupancy. 
      Include:
      1. Strategic greeting tailored for an Indian business lead.
      2. Summary of sales velocity and revenue growth in Lakhs/Crores if applicable.
      3. Three sales-focused pillars for growth (e.g., AOV, Festive Performance, High-Margin Items like Platters).
      4. A specific quarterly sales forecast for the Indian market.
      Dataset: ${fullDataContext}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            greeting: { type: Type.STRING },
            summary: { type: Type.STRING },
            pillars: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  label: { type: Type.STRING },
                  strategy: { type: Type.STRING }
                },
                required: ["label", "strategy"]
              }
            },
            quarterlyPrediction: { type: Type.STRING }
          },
          required: ["greeting", "summary", "pillars", "quarterlyPrediction"]
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};

/**
 * Analyzes restaurant feedback to determine customer sentiment and provide a brief analysis summary.
 * Uses gemini-3-flash-preview for low-latency sentiment classification.
 */
export const analyzeFeedback = async (comment: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze the following restaurant feedback and classify the sentiment. 
      Feedback: "${comment}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sentiment: { 
              type: Type.STRING, 
              description: "Must be 'positive', 'neutral', or 'negative'." 
            },
            analysis: { 
              type: Type.STRING,
              description: "A short, one-sentence summary of the sentiment findings."
            }
          },
          required: ["sentiment", "analysis"]
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Feedback Analysis Error:", error);
    return { sentiment: 'neutral', analysis: 'Feedback processing unavailable.' };
  }
};