import {
  Inject,
  Controller,
  Get,
  Query,
  App,
  Config,
} from '@midwayjs/decorator';
import { Application, Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { Validate } from '@midwayjs/validate';
import { UserDTO } from '@/dto/user/user.dto';
// import { MidwayHttpError } from '@midwayjs/core';
import { CustomError } from '../error/business.error';
import { Person } from '../entity/person.entity';
import { Role } from '@/entity/role.entity';
import { Response } from '@/utils/res.utils';
// import { HttpStatus, MidwayHttpError } from '@midwayjs/core';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @App()
  app: Application;

  @Inject()
  userService: UserService;

  @Config('name')
  userConfig;

  @Get('/get_user')
  async getUser(@Query('uid') uid) {
    const user = await this.userService.getUser({ uid });
    return { success: true, message: 'OK', data: user };
  }

  @Get('/test')
  @Validate()
  async getUserName(@Query() name: UserDTO) {
    // raw = true 1对多的数据会一条一条展示
    // raw = false 多的一方会成数组展示

    // 1对1 raw = true  raw=false 一样
    const data = await Person.findAll({
      include: [Role],
      raw: true,
    });
    this.ctx.logger.info('当前name:%s', this.userConfig);
    this.ctx.logger.info('当前环境:%s', this.app.getEnv());

    return Response.Success(data);

    return { success: true };
    // this.ctx.logger.debug('debug info');
    // this.ctx.logger.warn('WARNNING!!!!');
    // this.ctx.logger.error('Eoor');
    // throw new MidwayHttpError('my custom error', 30000);
    // throw new MyError();
    throw new CustomError();
    // this.ctx.logger.info('123');
    // throw {name:123}
    this.ctx.logger.info('123xaxaxaxax');
    return 1;
  }
}
