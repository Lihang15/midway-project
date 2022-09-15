import { Catch } from '@midwayjs/decorator';
import { MidwayError } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { AuthError, MyError, NotCanDoError } from '../error/business.error';
import { MidwayValidationError } from '@midwayjs/validate';
import { NotFoundError } from '@midwayjs/core/dist/error/http';

// 过滤已知的异常比如自定义异常(业务异常)，给出友好返回提示
@Catch([
  AuthError,
  MyError,
  MidwayValidationError,
  NotFoundError,
  NotCanDoError,
])
export class BusinessServerErrorFilter {
  async catch(err: MidwayError, ctx: Context) {
    if (err.name === 'NotFoundError') {
      ctx.status = 404;
      return {
        code: err.code,
        message: err.message,
      };
    }
    ctx.status = 403;
    return {
      code: err.code,
      message: err.message,
    };
  }
}
