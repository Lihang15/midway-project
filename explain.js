    // raw = true 1对多的数据会一条一条展示 即使对应的实体没有这个类型也可以映射出来
    // raw = false 多的一方会成数组展示

const { info } = require("console");

    // 1对1 raw = true  raw=false 一样
    const data = await Person.findAll({
        include:[Role],
        raw: true,
      });
    
    //   @PrimaryKey 必须在@Column上面
    //   @Column

    // debug < info <warn < error 
    // dev环境默认日志等级 info 也就是说debug不会打印
    // prod环境 默认warn
     // this.ctx.logger.debug('debug info');
    // this.ctx.logger.warn('WARNNING!!!!');
    // this.ctx.logger.error(new Error（）); 只有传入异常对象才会在
    // log目录保存 打印的日志
