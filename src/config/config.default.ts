import { MidwayConfig } from '@midwayjs/core';
import { Person } from '../entity/person.entity';
import { Role } from '../entity/role.entity';


export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1661174680666_1644',
  koa: {
    port: 7001,
  },
  view: {
    defaultViewEngine: 'nunjucks',
  },
  sequelize: {
    dataSource: {
      default: {
        database: 'egg-t',
        username: 'root', 
        password: 'wanglihang123456',
        host: 'localhost',
        port: 3306,
        encrypt: false,
        dialect: 'mysql',
        define: { charset: 'utf8' },
        timezone: '+08:00',
        entities: [Person,Role],
      },
    },
    sync: false, // 本地的时候，可以通过sync: true直接createTable
  },
} as MidwayConfig;
