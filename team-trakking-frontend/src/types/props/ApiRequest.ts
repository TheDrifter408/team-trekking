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
