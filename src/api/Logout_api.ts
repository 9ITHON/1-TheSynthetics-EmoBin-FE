import api from '../utils/api';
import { LogoutResponse } from '../types/auth';

export const logoutApi = async (refreshToken: string): Promise<LogoutResponse> => {
  const response = await api.post<LogoutResponse>('/auth/logout', {
    refreshToken,
  });
  return response.data;
};
