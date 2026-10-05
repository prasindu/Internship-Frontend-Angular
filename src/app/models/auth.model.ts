
export interface LoginRequest {
  email?: string | null;
  password?: string | null;
}

export interface RegisterRequest {
  name?: string | null;
  email?: string | null;
  password?: string | null;
  
}

export interface AuthResponse {
  token: string;
  name: string;
 
}