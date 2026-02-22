export interface User {
  email: string;
  token: string;
}

export type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<string | null>;
  logout: () => void;
};
