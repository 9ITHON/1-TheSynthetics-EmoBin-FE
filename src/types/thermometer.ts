export interface ThermometerProps {
  temperature: number;
}

export interface SummaryResponse {
  code: string;
  data: {
    monthlyTemperature: number;
  };
  message?: string;
}
