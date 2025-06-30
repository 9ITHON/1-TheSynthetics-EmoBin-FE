import {
  AuthRequest,
  ResponseType,
  makeRedirectUri,
  exchangeCodeAsync,
} from "expo-auth-session";

const REST_API_KEY = "ce11a8c09ff42d519d2257d412297dc7";

export async function kakaoLogin() {
  // const redirectUri = makeRedirectUri({
  //   useProxy: true,      // Proxy 사용
  //   scheme:   undefined, // <- 스킴 비활성 (중요!)
  // });
  const redirectUri ="http://localhost:8081";
  console.log("redirectUri:", redirectUri);

  const discovery = {
    authorizationEndpoint: "https://kauth.kakao.com/oauth/authorize",
    tokenEndpoint: "https://kauth.kakao.com/oauth/token",
  };

  const request = new AuthRequest({
    clientId: REST_API_KEY,
    redirectUri,
    responseType: ResponseType.Code,
    usePKCE: false,  
  });

  await request.makeAuthUrlAsync(discovery);

  const result = await request.promptAsync(discovery, { useProxy: true });
  if (result.type !== "success" || !result.params.code) {
    throw new Error("사용자 취소/실패");
  }

  const token = await exchangeCodeAsync(
    {
      clientId: REST_API_KEY,
      redirectUri,
      code: result.params.code,
      grantType: "authorization_code",
    },
    discovery
  );

  const profile = await fetch("https://kapi.kakao.com/v2/user/me", {
    headers: { Authorization: `Bearer ${token.accessToken}` },
  }).then(r => r.json());

  return { token, profile };
}
