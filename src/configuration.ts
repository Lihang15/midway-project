import { Configuration, App } from '@midwayjs/decorator';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
import * as view from '@midwayjs/view-nunjucks';
import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import { TestMiddleware } from './middleware/test.middleware';
import { InternalServerErrorFilter } from './filter/internal.filter';
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
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useFilter([InternalServerErrorFilter,DefaultErrorFilter])
    this.app.useMiddleware([ReportMiddleware,TestMiddleware]);
    
    // add filter
    // this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
  }
}
