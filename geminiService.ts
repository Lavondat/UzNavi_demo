
import { GoogleGenAI, Type } from "@google/genai";
import { UserPreferences, Place, ItineraryDay } from "./types";
import { MOCK_PLACES } from "./constants";

// Use this process.env.API_KEY string directly when initializing.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateTripItinerary = async (prefs: UserPreferences): Promise<ItineraryDay[]> => {
  // Use gemini-3-flash-preview for quick generation
  const prompt = `Generate a realistic ${prefs.days}-day travel itinerary for Uzbekistan based on these preferences:
    - Interests: ${prefs.interests.join(', ')}
    - Budget: ${prefs.budgetTier}
    - Type: ${prefs.tripType}
    - Pace: ${prefs.pace}
    
    Structure the response as an array of days. Each day should have:
    - day: number
    - summary: string
    - stops: array of objects with (name, description, category, reasonForInclusion)
    
    Ensure logical travel flow (e.g., grouping by city or neighborhood).`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              day: { type: Type.NUMBER },
              summary: { type: Type.STRING },
              stops: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    description: { type: Type.STRING },
                    category: { type: Type.STRING },
                    reasonForInclusion: { type: Type.STRING }
                  },
                  required: ["name", "description", "category"]
                }
              }
            },
            required: ["day", "summary", "stops"]
          }
        }
      }
    });

    const data = JSON.parse(response.text || '[]');
    
    // Map AI generated stops to our Place structure (with mock coordinates for the demo)
    return data.map((day: any) => ({
      ...day,
      stops: day.stops.map((stop: any, idx: number) => {
        // Try to find if we have a mock place with this name, otherwise generate one
        const existing = MOCK_PLACES.find(p => p.name.toLowerCase().includes(stop.name.toLowerCase()));
        if (existing) return existing;
        
        return {
          id: `gen-${day.day}-${idx}`,
          name: stop.name,
          category: stop.category,
          lat: 41.311081 + (Math.random() - 0.5) * 0.1, // Near Tashkent center
          lng: 69.240562 + (Math.random() - 0.5) * 0.1,
          image: `https://picsum.photos/seed/${stop.name}/600/400`,
          description: stop.description,
          price_range: prefs.budgetTier.includes('Gold') ? '$$$' : (prefs.budgetTier.includes('Silver') ? '$$' : '$'),
          phone: '+998 71 123 4567',
          opening_hours: '09:00 - 18:00',
          tags: [stop.category, 'AI Recommended']
        };
      })
    }));
  } catch (error) {
    console.error("Error generating itinerary:", error);
    return [];
  }
};

export const chatWithUzi = async (message: string, history: {role: 'user' | 'model', parts: {text: string}[]}[]): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [{ text: `You are "Uzi", a friendly and knowledgeable AI travel assistant for Uzbekistan. 
          Keep your answers short, enthusiastic, and helpful. Mention local gems. 
          Current user message: ${message}` }]
      },
      config: {
        systemInstruction: "You are Uzi, the friendly face of Uzbekistan tourism. You help users plan their trips, explain culture, and provide advice on etiquette, food, and transport."
      }
    });
    return response.text || "I'm sorry, I couldn't process that. Try again!";
  } catch (error) {
    console.error("Uzi Chat Error:", error);
    return "Something went wrong with Uzi's connection. Please try again later.";
  }
};
