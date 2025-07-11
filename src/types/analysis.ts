export interface AnalysisData {
  nickname: string;
  emotion: string;
  causes: string[];
  message: string;
}

export interface AnalysisResponse {
  code: string;
  data: any;
  message?: string;
}
