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
        joinPoint.target.ctx.logger.info('Enter: %s() Start Execution',joinPoint.methodName);
    }
    const result = joinPoint.proceed(...joinPoint.args)
    return result;
   }

   // 函数抛出异常 后执行
  async afterThrow(joinPoint: JoinPoint, error: Error){
    if(joinPoint.target?.ctx){
        joinPoint.target.ctx.logger.info('Current: %s() Execute failure',joinPoint.methodName);
    }
    if(error){
        throw error;
    }
  }
  // 函数正确返回后执行
  async afterReturn(joinPoint: JoinPoint, result: any){
    if(joinPoint.target?.ctx){
        joinPoint.target.ctx.logger.info('Current: %s() Execute successfully',joinPoint.methodName);
    }
    return result;
  }
 
  
}