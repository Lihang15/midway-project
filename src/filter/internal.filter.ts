import { Catch } from '@midwayjs/decorator';
import { MidwayError } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { AuthError, MyError } from '../error/test.error';




@Catch([AuthError,MyError])
export class InternalServerErrorFilter {
  async catch(err: MidwayError, ctx: Context) {
    ctx.status = 200;
    return {
        code: err.code,
        message: err.message
    }
  }
}