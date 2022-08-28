import { Table, Model, Column, PrimaryKey, HasMany } from 'sequelize-typescript';
import { Role } from './role.entity';
@Table({timestamps: false,
    freezeTableName: true,
    tableName: 'person', 
    paranoid: true, // deletedAt not null
    underscored: true, //先将firstName 转成first_name再去数据库进行映射(数据库也要first_name)
})
export class Person extends Model {
  @PrimaryKey
  @Column
  id: number;
  @Column
  name: string;

  @Column
  birthday: string;

  @Column
  createdAt: string;

  @Column
  updatedAt: Date;

  @HasMany(() => Role)
  roles: Role[];
}