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

export type MarkedDates = {
  [date: string]: {
    startingDay?: boolean;
    endingDay?: boolean;
    color?: string;
    textColor?: string;
  };
};
