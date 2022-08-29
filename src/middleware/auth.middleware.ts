import { IMiddleware } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { NextFunction, Context } from '@midwayjs/koa';
// import { MyError } from '../error/test.error';

// 这里可以拿到下一个中间件或者控制器的返回值（如果中间件没有返回值默认返回控制器的）
@Middleware()
export class AuthMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      // const user =undefined;
      // if(!user){
      //   // throw new AuthError();
      //   throw new MyError();
      // }
      // 控制器前执行的逻辑
      // 执行下一个 Web 中间件，最后执行到控制器
      // 这里可以拿到下一个中间件或者控制器的返回值
      const result = await next();
      // 返回给上一个中间件的结果
      return result;
    };
  }

  static getName(): string {
    return 'Test';
  }
}
