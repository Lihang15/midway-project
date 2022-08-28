import { Catch } from '@midwayjs/decorator';
import { MidwayError } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { AuthError, MyError } from '../error/test.error';
import { MidwayValidationError } from '@midwayjs/validate';
import { NotFoundError } from '@midwayjs/core/dist/error/http';


// 过滤已知的异常比如自定义异常，给出友好返回提示
@Catch([AuthError,MyError, MidwayValidationError,NotFoundError])
export class InternalServerErrorFilter {
  async catch(err: MidwayError, ctx: Context) {
    ctx.status = 403;
    return {
        code: err.code,
        message: err.message
    }
  }
}