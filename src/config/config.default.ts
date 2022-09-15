import { Order } from '@/entity/order.entity';
import { MidwayConfig } from '@midwayjs/core';
import { Person } from '../entity/person.entity';
import { Role } from '../entity/role.entity';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1661174680666_1644',
  koa: {
    port: 9999,
  },
  view: {
    defaultViewEngine: 'nunjucks',
  },
  sequelize: {
    dataSource: {
      default: {
        database: 'midway_project',
        username: 'root',
        password: '123456',
        host: '127.0.0.1',
        port: 3306,
        encrypt: false,
        dialect: 'mysql',
        define: { charset: 'utf8' },
        timezone: '+08:00',
        entities: [Person, Role, Order],
        sync: true, // 本地的时候，可以通过sync: true直接createTable
      },
    },
  },
} as MidwayConfig;
