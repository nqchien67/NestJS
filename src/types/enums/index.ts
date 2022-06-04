export enum ErrorCode {
  Unknown_Error = 'Unknown_Error',
  Not_Found = 'Not_Found',
  Email_Already_exist = 'Email_Already_exist',
  The_Allowed_Number_Of_Calls_Has_Been_Exceeded = 'The_Allowed_Number_Of_Calls_Has_Been_Exceeded',
  Verify_Token_Fail = 'Verify_Token_Fail',
  Validate_fail = 'Validate_fail',
  User_In_Active = 'User_In_Active',
  Auth_Failed = 'Auth_Failed',
  Access_Denied = 'Access_Denied',
}

export enum ErrorMessage {
  Unknown_Error = 'Unknown_Error',
  Not_Found = 'Not_Found',
  The_Allowed_Number_Of_Calls_Has_Been_Exceeded = 'The_Allowed_Number_Of_Calls_Has_Been_Exceeded',
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum Action {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETED = 'DELETED',
  VIEW = 'VIEW',
}

export enum TokenType {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
  REGISTER_TOKEN = 'REGISTER_TOKEN',
}

export enum CommonStatus {
  INACTIVE = 0,
  ACTIVE = 1,
}

export enum UserType {
  CLIENT = 1,
  ADMIN = 2,
}
