import * as SecureStore from "expo-secure-store";
import axios from "axios";

const ACCESS_KEY  = "jwt-access";
const REFRESH_KEY = "jwt-refresh";

const IOS_ACCESSIBLE = SecureStore.AFTER_FIRST_UNLOCK;

const ANDROID_OPTIONS: SecureStore.SecureStoreOptions = {
};


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

  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};


export const loadTokens = async () => {
  const accessToken  = await SecureStore.getItemAsync(ACCESS_KEY);
  const refreshToken = await SecureStore.getItemAsync(REFRESH_KEY);
  return { accessToken, refreshToken };
};


export const clearTokens = async () => {
  await SecureStore.deleteItemAsync(ACCESS_KEY);
  await SecureStore.deleteItemAsync(REFRESH_KEY);
};
