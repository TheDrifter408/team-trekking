export interface ApiResponse<T = any> {
  data: T; // Data can be either a single object or an array of objects
  error: T;
  statusCode: number;
}
export interface CreateUserResponse {
  userData: {
    id: number;
    fullName: string;
    email: string;
    role: {
      id: number;
      name: string;
    };
    forcePasswordChange: boolean;
    isActive: boolean;
  };
  token: string;
  refreshToken: string;
}
