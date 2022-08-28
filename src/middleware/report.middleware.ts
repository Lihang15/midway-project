import { IMiddleware } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { NextFunction, Context } from '@midwayjs/koa';

@Middleware()
export class ReportMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      // 控制器前执行的逻辑
      // const startTime = Date.now();
      // 执行下一个 Web 中间件，最后执行到控制器
      // 这里可以拿到下一个中间件或者控制器的返回值
      const result = await next();
      // console.log(result)
      // 控制器之后执行的逻辑
      return {
        code: 0,
        message: 'success',
        data: result,
      }
      // 返回给上一个中间件的结果
      //如果是第一个中间件 返回给ui
    };
  }
  ignore(ctx: Context): boolean {
    // 下面的路由将忽略此中间件
    return ctx.path === '/weather'
  }
  static getName(): string {
    return 'report';
  }
}
