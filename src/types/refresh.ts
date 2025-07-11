export interface RefreshPayload {
  refreshToken: string;
}

export interface RefreshResponse {
  accessToken:  string;
  refreshToken: string;
}
