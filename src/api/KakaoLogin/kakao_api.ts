import axios from "axios";
import qs from "qs"; // 작동은 잘 되는데 왜 빨간 밑줄 에러가 뜰까..?
import { KakaoToken } from "../../types/kakao_api";
import { KakaoProfile } from "../../types/kakao_api";
import Config from "react-native-config";

export const REST_KEY = process.env.REST_API_KEY;
export const REDIRECT_URI = "https://dummy.emobin.app/oauth";

export const AUTH_URL =
  "https://kauth.kakao.com/oauth/authorize?" +
  new URLSearchParams({
    client_id: REST_KEY,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope: "profile_nickname",
  } as Record<string, string>).toString();




export async function exchangeKakaoToken(code: string): Promise<KakaoToken> {
  try {
    const { data } = await axios.post<KakaoToken>(
      "https://kauth.kakao.com/oauth/token",
      qs.stringify({
        grant_type: "authorization_code",
        client_id: REST_KEY,
        redirect_uri: REDIRECT_URI,
        code,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return data;
  } catch (error: any) {
    const { status, statusText } = error.response ?? {};
    throw new Error(
      `Kakao token exchange failed${status ? `: ${status} ${statusText}` : ""}`
    );
  }
}


export async function fetchKakaoProfile(
  accessToken: string
): Promise<KakaoProfile> {
  try {
    const { data } = await axios.get<any>(
      "https://kapi.kakao.com/v2/user/me",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const kakaoProfile: KakaoProfile = {
      id: String(data.id),
      profile: data.kakao_account?.profile ?? {},
      email: data.kakao_account?.email,
    };

    return kakaoProfile;
  } catch (error: any) {
    const { status, statusText } = error.response ?? {};
    throw new Error(
      `Fetching Kakao profile failed${status ? `: ${status} ${statusText}` : ""}`
    );
  }
}


export const kakaoApi = axios.create({
  baseURL: "https://kapi.kakao.com",
});