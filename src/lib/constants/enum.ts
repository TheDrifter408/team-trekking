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

enum Priority {
  NONE = 'none',
  LOW = 'low',
  MIDDLE = 'mid',
  HIGH = 'high',
}
export type PriorityType = keyof typeof Priority;

export { UserRole, RegistrationType, OtpType, Priority };
