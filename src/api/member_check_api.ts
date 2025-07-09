// 회원 여부 확인(로그인) API
import axios from "axios";

export interface MemberCheckResponse {
  code: string;            // "OK" | "MEMBER_NOT_FOUND" ...
  data: {
    nickname: string;
    oauthId: number;
    oauthProvider: string; // "KAKAO" ...
  };
  message: string;
}

/** accessToken을 보내서 회원 여부를 확인한다. */
export const memberCheck = async (
  accessToken: string
): Promise<MemberCheckResponse> => {
  const { data } = await axios.post<MemberCheckResponse>(
    "http://52.64.128.49:8080/auth/kakao/login",
    { accessToken },
    { headers: { "Content-Type": "application/json" } }
  );
  return data;
};
