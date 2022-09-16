import { MidwayConfig } from '@midwayjs/core';

// 本地默认跑这个配置跑的ts文件，其他环境需要先执行build 再去执行跑的编译后的文件，入口是bootstrap.js
export default {
  // use for cookie sign key, should change to your own and keep security
  name: 'local env',
} as MidwayConfig;
