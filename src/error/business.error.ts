import { MidwayError } from '@midwayjs/core';

// 自定义业务异常
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

export class UserError extends MidwayError {
  constructor() {
    super('wanglihang不允许登陆', '123456789');
  }
}

export class NotCanDoError extends MidwayError {
  constructor() {
    super('这是我的一个业务异常 我不允许你进行操作', '123456789');
  }
}
