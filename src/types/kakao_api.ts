export interface KakaoToken {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
}

export interface KakaoProfile {
  id: string;
  profile: {
    nickname: string;
    profile_image_url?: string;
    thumbnail_image_url?: string;
  };
  email?: string;
}