export interface HuggingFaceQueryData {
    inputs: string;
  }
  
  export interface HuggingFaceResponse {
    generated_text?: string;
    error?: string;
  }


  export async function query(data: HuggingFaceQueryData): Promise<HuggingFaceResponse> {
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
        {
          headers: {
            Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
  
      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`API ERROR: ${response.statusText || errorDetails}`);
      }
  
      const result = await response.json();
      console.log("Raw API Response:", JSON.stringify(result, null, 2));
  
      // Extract generated_text from the first item in the array
      const generatedText = result[0]?.generated_text;
      if (!generatedText) {
        throw new Error("No generated text found in API response");
      }
  
      return { generated_text: generatedText };
    } catch (error) {
      console.error("Error querying the API:", error);
      return { error: "Unable to fetch response from the chatbot" };
    }
  }
  
  
  