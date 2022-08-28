import { Aspect, IMethodAspect, JoinPoint } from '@midwayjs/decorator';
// import { Context } from '@midwayjs/koa';
import { APIController } from '../controller/api.controller';
import { HomeController } from '../controller/home.controller';
import { WeatherController } from '../controller/weather.controller';
// import { HomeController } from '../controller/home.controller';

// 单例作用域 不能注入 request作用域的 ctx
@Aspect([APIController,HomeController,WeatherController])
export class ReportInfo implements IMethodAspect {
    // async before(joinPoint: JoinPoint) {
    //     joinPoint.target.ctx.logger.info('----------------将执行当前函数: %s ------------------',joinPoint.methodName);
    //   }
   
    //包裹整个函数的执行
  async around(joinPoint: JoinPoint){
    if(joinPoint.target?.ctx){
        // log.debug("Enter: {}() with argument[s] = {}", joinPoint.getSignature().getName(), Arrays.toString(joinPoint.getArgs()));
        joinPoint.target.ctx.logger.info('----------------执行当前函数: %s()------------------',joinPoint.methodName);
    }
    const result = joinPoint.proceed(...joinPoint.args)
    return result;
   }

  async afterThrow(joinPoint: JoinPoint, error: Error){
    if(joinPoint.target?.ctx){
        joinPoint.target.ctx.logger.info('----------------当前函数执: %s() 执行失败-----------------',joinPoint.methodName);
    }
    if(error){
        throw error;
    }
  }

  async afterReturn(joinPoint: JoinPoint, result: any){
    if(joinPoint.target?.ctx){
        joinPoint.target.ctx.logger.info('----------------当前函数: %s() 执行成功------------------',joinPoint.methodName);
    }
    return result;
  }
 
  
}