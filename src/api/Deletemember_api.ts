import api from '../utils/api';
import { WithdrawalResponse } from '../types/auth';


const withdrawalApi = async (refreshToken: string): Promise<WithdrawalResponse> => {
  const response = await api.delete<WithdrawalResponse>('/api/member/me', {
    data: { refreshToken },
  });
  return response.data;
};

export default withdrawalApi;