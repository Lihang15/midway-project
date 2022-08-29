import { IMiddleware } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { NextFunction, Context } from '@midwayjs/koa';

//处理没有异常情况下的 返回值
//异常情况 参考过滤器
@Middleware()
export class ResMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const result = await next();
      // 控制器之后执行的逻辑
      return {
        code: 0,
        message: 'success',
        data: result,
      };
      // 返回给上一个中间件的结果
      //如果是第一个中间件 返回给ui
    };
  }
  ignore(ctx: Context): boolean {
    // 下面的路由将忽略此中间件
    return ctx.path === '/weather';
  }
  static getName(): string {
    return 'report';
  }
}
