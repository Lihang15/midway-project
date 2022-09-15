import {
  Table,
  Model,
  Column,
  PrimaryKey,
  DataType,
  BeforeCreate,
} from 'sequelize-typescript';

import { customAlphabet } from 'nanoid';

@Table({
  engine: 'innodb',
  timestamps: true, //false 忽略createdAt 和updateAt 查询列不会自动拼接
  freezeTableName: true,
  tableName: 'dpo_order',
  paranoid: true, // 忽略deletedAt  查询条件忽略
  underscored: true, //先将firstName 转成first_name再去数据库进行映射(数据库也要first_name)
  indexes: [
    {
      fields: ['no', 'creator_cid'],
      unique: true,
    },
    {
      fields: ['transaction_code'],
      unique: true,
    },
  ],
})
export class Order extends Model {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER({
      length: 11,
      unsigned: true,
    }),
    autoIncrement: true,
    primaryKey: true,
    comment: '订单id',
  })
  id: number;

  @Column({ type: DataType.CHAR(6), allowNull: true })
  transaction_code: string;

  @Column({ type: DataType.CHAR(20), allowNull: false })
  no: string;

  @Column({ type: DataType.CHAR(20), allowNull: true })
  buyer_no: string;

  @Column({ type: DataType.CHAR(20), allowNull: true })
  buyer_cid: string;

  @Column({ type: DataType.CHAR(50), allowNull: false })
  buyer_name: string;

  @Column({ type: DataType.CHAR(20), allowNull: true })
  buyer_uen: string;

  @Column({ type: DataType.JSON, allowNull: false })
  buyer_info: any;

  @Column({
    type: DataType.INTEGER({
      length: 11,
      unsigned: true,
    }),
    allowNull: true,
  })
  buyer_contact_id: number;

  @Column({ type: DataType.CHAR(30), allowNull: true })
  vendor_no: string;

  @Column({ type: DataType.CHAR(21).BINARY })
  vendor_cid: string;

  @Column({ type: DataType.CHAR(50), allowNull: false })
  vendor_name: string;

  @Column({ type: DataType.CHAR(20) })
  vendor_uen: string;

  @Column({ type: DataType.STRING(255) })
  department: string;

  @Column({ type: DataType.JSON, allowNull: false })
  vendor_info: any;

  @Column({
    type: DataType.INTEGER({
      length: 11,
      unsigned: true,
    }),
  })
  vendor_contact_id: number;

  @Column({ type: DataType.JSON })
  invoice_ids: any;

  @Column({ type: DataType.CHAR(21).BINARY })
  requestor_uid: string;

  @Column({ type: DataType.STRING(255) })
  requestor_name: string;

  @Column({ type: DataType.CHAR(21).BINARY, allowNull: false })
  creator_uid: string;

  @Column({ type: DataType.CHAR(21).BINARY, allowNull: false })
  creator_cid: string;

  @Column({ type: DataType.DATE, allowNull: false })
  order_date: Date;

  @Column({ type: DataType.DATE })
  delivery_date: Date;

  @Column({ type: DataType.TEXT, defaultValue: '' })
  selected_reason: string;

  @Column({ type: DataType.TEXT, defaultValue: '' })
  description: string;

  @Column({ type: DataType.CHAR(3), allowNull: false })
  currency: string;

  @Column({ type: DataType.STRING })
  vendor_code: string;

  @Column({ type: DataType.DECIMAL(11, 2).UNSIGNED, allowNull: false })
  amount_before_gst: number;

  @Column({ type: DataType.ENUM('GST', 'NGST') })
  gst: string;

  @Column({ type: DataType.ENUM('7P', 'ZP', 'NA') })
  gst_group: string;

  @Column({ type: DataType.DECIMAL(5, 4).UNSIGNED })
  gst_rate: number;

  @Column({ type: DataType.DECIMAL(11, 2).UNSIGNED })
  gst_amount: string;

  @Column({ type: DataType.ENUM('flat', 'percent') })
  gst_type: string;

  @Column({ type: DataType.DECIMAL(11, 2), allowNull: false, defaultValue: 0 })
  adjustment: number;

  @Column({ type: DataType.DECIMAL(11, 2).UNSIGNED })
  total_amount: number;

  @Column({ type: DataType.JSON, defaultValue: [] })
  discarded_quotation: any;

  @Column({ type: DataType.ENUM('order', 'vendor', 'document', 'approver') })
  creation_step: string;

  @Column({
    type: DataType.ENUM(
      'creating',
      'procurement_approving',
      'delivering',
      'delivery_confirming',
      'payee_confirming',
      'ap_confirming',
      'completed',
      'discarded'
    ),
  })
  status: string;

  @Column({ type: DataType.CHAR(21).BINARY })
  current_approver_uid: string;

  @Column({ type: DataType.STRING(255) })
  returned_reason: string;

  @BeforeCreate
  static async makeUpperCase(dpo_order: Order) {
    if (dpo_order.isNewRecord) {
      do {
        dpo_order.transaction_code = `${customAlphabet(
          '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
          6
        )}`;
      } while (
        await Order.findOne({
          where: { transaction_code: dpo_order.transaction_code },
          paranoid: false,
        })
      );
    }
  }
}
