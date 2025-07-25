export interface ApiResponse<T> {
  data: T; // Data can be either a single object or an array of objects
  error: T;
  statusCode: number;
}
export interface UserResponse {
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
