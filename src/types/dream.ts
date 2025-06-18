export interface DreamInterpretation {
  symbols: Array<{
    symbol: string;
    meaning: string;
  }>;
  emotions: string[];
  themes: string[];
  interpretation: string;
  takeaway: string;
}

export interface DreamAnalysisRequest {
  dreamDescription: string;
  model?: string;
  apiEndpoint?: string;
}

export interface ApiResponse {
  success: boolean;
  data?: DreamInterpretation;
  error?: string;
}