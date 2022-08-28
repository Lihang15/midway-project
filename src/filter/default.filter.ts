import { Catch } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';

@Catch()
export class DefaultErrorFilter {
  async catch(err: Error, ctx: Context) {
    // 所有的未分类错误会到这里
    // 没有捕获到的异常会在被被系统捕获  在控制台打印和返回前端 体验不好
    // 可以把知道的业务异常都捕获 不知道的 按不知道处理
    // if(err.name==='MidwayValidationError'){
    //   return {
    //     code: 9999,
    //     message: err.message,
    //   };
    // }

    // if(err.name==='NotFoundError'){
    //   return {
    //     code: 404,
    //     message: err.message,
    //   };
    // }
    // if(err.name==='AuthError'){
    //   return {
    //     code: 400,
    //     message: err.message,
    //   };
    // }
    // 不知道啥类型 可能是数据库操作异常等等 
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
