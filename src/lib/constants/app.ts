const App = {
  AUTH_BASE_URL: 'http://192.168.0.102:3001/',
  SPACE_BASE_URL: 'http://192.168.0.102:3006/',
};

enum UserRole {
  User = 2,
  ADMIN = 1,
}

enum RegistrationType {
  EMAIL = 'EMAIL',
}

enum OtpType {
  REGISTRATION = 'REGISTRATION',
  PASSWORD_REST = 'PASSWORD_RESET',
}

export { App, UserRole, OtpType, RegistrationType };
