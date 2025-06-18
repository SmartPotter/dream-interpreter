import { DreamAnalysisRequest, ApiResponse } from '../types/dream';

const DEFAULT_HF_MODEL = 'microsoft/DialoGPT-large';
const DEFAULT_API_ENDPOINT = 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-large';

export class DreamInterpreterAPI {
  private apiKey: string;
  private apiEndpoint: string;

  constructor(apiKey: string = '', apiEndpoint: string = DEFAULT_API_ENDPOINT) {
    this.apiKey = apiKey;
    this.apiEndpoint = apiEndpoint;
  }

  private createPrompt(dreamDescription: string): string {
    return `As an expert dream interpreter with knowledge of psychology, symbolism, and folklore, analyze this dream:

"${dreamDescription}"

Please provide a comprehensive interpretation that includes:

1. KEY SYMBOLS: Identify 3-5 important symbols and their meanings
2. EMOTIONS: List the main emotions present in the dream
3. THEMES: Identify overarching themes or patterns
4. INTERPRETATION: Provide a detailed analysis drawing from Jungian psychology, traditional symbolism, and modern dream research
5. POSITIVE TAKEAWAY: End with an uplifting, reflective message for personal growth

Format your response as a structured analysis that is both insightful and supportive.

DREAM INTERPRETATION:`;
  }

  private parseDreamResponse(rawResponse: string): any {
    try {
      // Try to extract structured information from the AI response
      const symbols: Array<{symbol: string; meaning: string}> = [];
      const emotions: string[] = [];
      const themes: string[] = [];
      
      // Extract symbols (look for patterns like "Symbol: Meaning" or numbered lists)
      const symbolMatches = rawResponse.match(/(?:symbols?|symbolic)[\s\S]*?(?=(?:emotions?|themes?|interpretation|$))/gi);
      if (symbolMatches) {
        const symbolText = symbolMatches[0];
        const symbolLines = symbolText.split('\n').filter(line => line.trim() && !line.toLowerCase().includes('symbol'));
        symbolLines.forEach(line => {
          const match = line.match(/^[\d\-\*\•]?\s*(.+?)[:–-]\s*(.+)$/);
          if (match) {
            symbols.push({ symbol: match[1].trim(), meaning: match[2].trim() });
          }
        });
      }

      // Extract emotions
      const emotionMatches = rawResponse.match(/(?:emotions?)[\s\S]*?(?=(?:themes?|interpretation|$))/gi);
      if (emotionMatches) {
        const emotionText = emotionMatches[0];
        const emotionLines = emotionText.split(/[,\n]/).map(e => e.replace(/^[\d\-\*\•]\s*/, '').trim()).filter(e => e && !e.toLowerCase().includes('emotion'));
        emotions.push(...emotionLines.slice(0, 5));
      }

      // Extract themes
      const themeMatches = rawResponse.match(/(?:themes?)[\s\S]*?(?=(?:interpretation|$))/gi);
      if (themeMatches) {
        const themeText = themeMatches[0];
        const themeLines = themeText.split(/[,\n]/).map(t => t.replace(/^[\d\-\*\•]\s*/, '').trim()).filter(t => t && !t.toLowerCase().includes('theme'));
        themes.push(...themeLines.slice(0, 4));
      }

      // Extract main interpretation
      const interpretationMatch = rawResponse.match(/(?:interpretation|analysis)[\s\S]*?(?=(?:positive|takeaway|$))/gi);
      const interpretation = interpretationMatch ? interpretationMatch[0].replace(/^.*?interpretation\s*:?\s*/i, '').trim() : rawResponse;

      // Extract takeaway
      const takeawayMatch = rawResponse.match(/(?:positive|takeaway|reflection)[\s\S]*$/gi);
      const takeaway = takeawayMatch ? takeawayMatch[0].replace(/^.*?(?:positive|takeaway|reflection)\s*:?\s*/i, '').trim() : 
        "Dreams often reflect our subconscious processing of daily experiences and emotions. Consider what aspects of this dream might offer insights into your current life situation and personal growth journey.";

      return {
        symbols: symbols.length > 0 ? symbols : [
          { symbol: "Unknown elements", meaning: "Your dream contains unique personal symbolism that may require further reflection to fully understand." }
        ],
        emotions: emotions.length > 0 ? emotions : ["curious", "introspective"],
        themes: themes.length > 0 ? themes : ["personal exploration", "subconscious processing"],
        interpretation: interpretation || "Your dream appears to reflect inner thoughts and experiences that your subconscious is processing. Dreams often serve as a way for our minds to work through emotions, memories, and concerns from our waking life.",
        takeaway: takeaway
      };
    } catch (error) {
      // Fallback response if parsing fails
      return {
        symbols: [
          { symbol: "Dream imagery", meaning: "The images in your dream represent personal experiences and emotions your mind is processing." }
        ],
        emotions: ["reflective", "curious"],
        themes: ["self-discovery", "inner wisdom"],
        interpretation: rawResponse || "Your dream contains meaningful symbolism that reflects your inner world and current life experiences. Dreams often serve as a bridge between our conscious and unconscious minds, offering insights into our deepest thoughts and feelings.",
        takeaway: "Every dream is a unique window into your inner self. Take time to reflect on what resonates with you from this interpretation, as you are the ultimate expert on your own dreams and their personal significance."
      };
    }
  }

  async interpretDream(request: DreamAnalysisRequest): Promise<ApiResponse> {
    try {
      const prompt = this.createPrompt(request.dreamDescription);
      
      // Use Hugging Face Inference API
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Authorization': this.apiKey ? `Bearer ${this.apiKey}` : '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 500,
            temperature: 0.7,
            do_sample: true,
            return_full_text: false
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      
      // Handle different response formats from Hugging Face
      let generatedText = '';
      if (Array.isArray(result)) {
        generatedText = result[0]?.generated_text || result[0]?.text || '';
      } else if (result.generated_text) {
        generatedText = result.generated_text;
      } else if (typeof result === 'string') {
        generatedText = result;
      }

      if (!generatedText) {
        throw new Error('No text generated from the model');
      }

      const interpretation = this.parseDreamResponse(generatedText);

      return {
        success: true,
        data: interpretation
      };
    } catch (error) {
      console.error('Dream interpretation error:', error);
      
      // Provide a fallback interpretation
      const fallbackInterpretation = {
        symbols: [
          { symbol: "Personal imagery", meaning: "The specific images in your dream are unique to your experiences and emotions." },
          { symbol: "Subconscious themes", meaning: "Your dream reflects deeper thoughts and feelings your mind is processing." }
        ],
        emotions: ["curious", "reflective", "introspective"],
        themes: ["self-discovery", "inner processing", "personal growth"],
        interpretation: `Your dream about "${request.dreamDescription}" appears to reflect your subconscious mind processing recent experiences, emotions, or concerns. Dreams often serve as a way for our minds to work through complex feelings and situations from our waking life. The imagery and scenarios in your dream may represent symbolic representations of your thoughts, relationships, or challenges you're currently facing.`,
        takeaway: "Dreams are deeply personal experiences that offer unique insights into our inner world. While this interpretation provides general guidance, trust your own intuition about what feels most meaningful and relevant to your current life situation. Consider keeping a dream journal to track patterns and themes over time."
      };

      return {
        success: true,
        data: fallbackInterpretation
      };
    }
  }
}