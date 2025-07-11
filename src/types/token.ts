export type Tokens = {
  accessToken:  string | null;
  refreshToken: string | null;
};

export interface TokenState extends Tokens {
  setTokens:  (a: string, r: string) => void;
  clear: () => Promise<void>; 
}