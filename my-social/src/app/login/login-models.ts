export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  isSuccess: boolean;
  message: string;
}
