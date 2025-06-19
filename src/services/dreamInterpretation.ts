export const interpretDream = async (dreamText: string): Promise<any> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  console.log("Using Gemini API Key:", apiKey);

  const model = "gemini-1.5-flash-latest";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const prompt = `
You are an expert dream interpreter. Interpret the following dream and return a JSON object with the following fields:
{
  "overallInterpretation": string,
  "symbolism": string,
  "emotions": string,
  "themes": string,
  "insights": string
}
Dream: "${dreamText}"
Respond with JSON only.
`;

  const requestBody = {
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }]
      }
    ]
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API error response:", errorData);

      if (response.status === 429) {
        const retryDelay = parseRetryDelay(errorData) || 20;
        console.warn(`429 Rate limited. Retrying after ${retryDelay}s...`);
        await delay(retryDelay * 1000);
        return await interpretDream(dreamText);
      }

      throw new Error(
        `Gemini API error: ${response.status} - ${JSON.stringify(errorData, null, 2)}`
      );
    }

    const responseData = await response.json();
    console.log("API raw response data:", responseData);

    const interpretationText = responseData.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!interpretationText) {
      console.warn("No interpretation found in API response.");
      return null;
    }

    // Clean code block formatting (if present)
    const cleanedText = interpretationText
      .replace(/^\s*```json\s*/i, "")
      .replace(/\s*```\s*$/, "")
      .trim();

    console.log("Cleaned interpretation text:", cleanedText);

    const interpretationJson = JSON.parse(cleanedText);
    return interpretationJson;

  } catch (error) {
    console.error("API error or parsing issue:", error);
    throw error;
  }
};

const parseRetryDelay = (errorData: any): number | null => {
  const retryInfo = errorData?.error?.details?.find(
    (detail: any) => detail["@type"] === "type.googleapis.com/google.rpc.RetryInfo"
  );
  if (retryInfo?.retryDelay) {
    const seconds = parseInt(retryInfo.retryDelay.replace("s", ""));
    return isNaN(seconds) ? null : seconds;
  }
  return null;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
