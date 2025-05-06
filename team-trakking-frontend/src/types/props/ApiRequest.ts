export interface OTPRequest {
  email: string;
  otpType: string;
  type: string;
}
export interface VerifyOtpRequest {
  email: string;
  otpType: string;
  otp: string;
  type: string;
}
export interface CreateUserRequest {
  fullName: string;
  email: string;
  password: string;
  roleId: number;
  permissionIds?: number[];
  otp: string;
}
export interface SigninRequest {
  email: string;
  password: string;
  roleId: number;
}
