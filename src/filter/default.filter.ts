import { Catch } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';

//所有的未分类错误会到这里
// 如果不过滤未知的异常 比如数据库错误，会被系统捕获，抛到控制台，和前端
// 在这里过滤 可以给前台一个友好提示，后台控制台打印，排查错误
@Catch()
export class DefaultErrorFilter {
  async catch(err: Error, ctx: Context) {
    // 后台直接打印 错误，不让前台看到异常错误 给个友好提示
    // 把Error类型直接传入 在控制台打印 并保存在common-error.log文件里
    ctx.logger.error(err)
    ctx.status=500;
    return {
      code: 500,
      message: '服务内部异常',
    };
  }
}
