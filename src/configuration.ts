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
// import * as NacosClient from 'nacos';
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
    // const client = new NacosClient.NacosNamingClient({
    //   logger: console,
    //   serverList: '127.0.0.1:8848', // nacos服务端的地址
    //   namespace: 'public', //nacos命名空间
    // });
    // client.ready().then(() => {
    //   const serviceName = 'nodejs.midway.test'; //服务名
    //   //开始注册
    //   client.registerInstance(serviceName, {
    //     ip: '127.0.0.1',
    //     port: 9999,
    //   });
    // });

    // add middleware
    this.app.useMiddleware([ResMiddleware, AuthMiddleware]);

    // add filter
    this.app.useFilter([BusinessServerErrorFilter, DefaultErrorFilter]);
  }
}
