import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../types/navigation";

export type RecommendRouteProp = RouteProp<RootStackParamList, "Recommend">;

export interface Movie {
  title: string;
  posterUrl: string;
  overview: string;
  releaseDate: string;
  rating: number;
}

export interface PlayItem {
  musictitle: string;
  musicUrl: string;
}