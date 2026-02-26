export enum LoginErrors {
  INVALID_LOGIN = 'Epic sadface: Username and password do not match any user in this service',
  EMPTY_LOGIN = 'Epic sadface: Username is required',
  EMPTY_PASSWORD = 'Epic sadface: Password is required',
  LOCKED_USER = 'Epic sadface: Sorry, this user has been locked out.',
}

export const logins = {
  standardUser: 'standard_user',
  lockedUser: 'locked_out_user',
  problemUser: 'problem_user',
  glitchUser: 'performance_glitch_user',
  errorUser: 'error_user',
  visualUser: 'visual_user',
};

export const passwordValid = 'secret_sauce';
