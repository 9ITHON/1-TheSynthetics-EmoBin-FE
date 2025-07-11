export interface KakaoProfile {
  id: string; // Kakao user id (문자열)
  profile: {
    nickname: string;
    profile_image_url?: string;
    thumbnail_image_url?: string;
  };
  email?: string;
}


export interface AuthState {
  profile: KakaoProfile | null;
  setProfile: (p: KakaoProfile) => void;
  logout: () => void;
}

export interface BackendUserData {
  oauthId: number;
  oauthProvider: 'KAKAO' | 'APPLE' | string;
  nickname?: string;
}

export interface BackendLoginData {
  code: string;
  data: BackendUserData;
  message: string;
}

