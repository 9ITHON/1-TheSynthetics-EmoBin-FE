export interface MemberCheckResponse {
  code: string;          
  data: {
    nickname:      string;
    oauthId:       number;
    oauthProvider: string;
  };
  message: string;

  accessToken?:  string;
  refreshToken?: string;
}