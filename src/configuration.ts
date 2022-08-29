import { Configuration, App } from '@midwayjs/decorator';
import 'tsconfig-paths/register';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
import * as view from '@midwayjs/view-nunjucks';
import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';
import { ResMiddleware } from './middleware/res.middleware';
import { AuthMiddleware } from './middleware/auth.middleware';
import { BusinessServerErrorFilter } from './filter/business.filter';
import * as sequelize from '@midwayjs/sequelize';
// import { DefaultErrorFilter } from './filter/default.filter';

@Configuration({
  imports: [
    koa,
    view,
    validate,
    sequelize,
    {
      component: info,
      enabledEnvironment: ['local', 'dev'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([ResMiddleware, AuthMiddleware]);

    // add filter
    this.app.useFilter([BusinessServerErrorFilter, DefaultErrorFilter]);
  }
}
