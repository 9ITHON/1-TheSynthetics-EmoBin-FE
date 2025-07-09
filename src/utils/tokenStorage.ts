// src/utils/tokenStorage.ts
import * as SecureStore from "expo-secure-store";

const ACCESS_KEY  = "jwt-access";
const REFRESH_KEY = "jwt-refresh";

/** iOS Keychain 접근 수준(선택): 앱이 첫 잠금 해제 후에도 접근 가능 */
const IOS_ACCESSIBLE = SecureStore.AFTER_FIRST_UNLOCK;

/** Android 옵션 예시: 기본값(encrypted: true)이면 Keystore 암호화 적용 */
const ANDROID_OPTIONS: SecureStore.SecureStoreOptions = {
  // requireAuthentication: true,          // ↙︎ 지문·FaceID + PIN 이후에만 사용하려면 주석 해제
  // encrypted: true,                      // 기본값이 true
};

/*───────────────────────────────────────*
 * 1. 저장
 *───────────────────────────────────────*/
export const saveTokens = async (
  accessToken: string,
  refreshToken: string
) => {
  await SecureStore.setItemAsync(ACCESS_KEY, accessToken, {
    keychainAccessible: IOS_ACCESSIBLE,
    ...ANDROID_OPTIONS,
  });

  await SecureStore.setItemAsync(REFRESH_KEY, refreshToken, {
    keychainAccessible: IOS_ACCESSIBLE,
    ...ANDROID_OPTIONS,
  });
};

/*───────────────────────────────────────*
 * 2. 읽기
 *───────────────────────────────────────*/
export const loadTokens = async () => {
  const accessToken  = await SecureStore.getItemAsync(ACCESS_KEY);
  const refreshToken = await SecureStore.getItemAsync(REFRESH_KEY);
  return { accessToken, refreshToken };
};

/*───────────────────────────────────────*
 * 3. 삭제(로그아웃)
 *───────────────────────────────────────*/
export const clearTokens = async () => {
  await SecureStore.deleteItemAsync(ACCESS_KEY);
  await SecureStore.deleteItemAsync(REFRESH_KEY);
};
