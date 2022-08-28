import { MidwayError } from '@midwayjs/core';

export class CustomError extends MidwayError {
  constructor() {
    super('my custom error', 'CUSTOM_ERROR_CODE_10000');
  }
}

export class MyError extends MidwayError {
    constructor() {
      super('my error', 'MY_ERROR_CODE_10000');
    }
  }

  export class AuthError extends MidwayError {
    constructor() {
      super('auth error', 'AUTH_ERROR_CODE_10001');
    }
  }