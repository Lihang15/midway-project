import { Table, Model, Column, PrimaryKey, ForeignKey } from 'sequelize-typescript';
import { Person } from './person';

@Table({timestamps: false, //false 忽略createdAt 和updateAt 查询列不会自动拼接
    freezeTableName: true,
    tableName: 'roles',
    paranoid: true, // 忽略deletedAt  查询条件忽略
    underscored: true, //先将firstName 转成first_name再去数据库进行映射(数据库也要first_name)
})
export class Role extends Model {
  @PrimaryKey
  @Column
  id: number;
  @Column
  @ForeignKey(() => Person)
  personId: number;
  @Column
  role: string;
}