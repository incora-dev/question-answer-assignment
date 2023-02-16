export interface ILoginState {
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

export interface ILoginRequestData {
  username: string;
  password: string;
}

export interface ILoginPayload {
  token: string;
}
