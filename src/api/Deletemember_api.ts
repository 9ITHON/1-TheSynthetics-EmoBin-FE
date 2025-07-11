import api from '../utils/api';
import { WithdrawalResponse } from '../types/auth';


export const withdrawalApi = async (refreshToken: string): Promise<WithdrawalResponse> => {
  const response = await api.delete<WithdrawalResponse>('/api/member/me', {
    data: { refreshToken },
  });
  return response.data;
};
