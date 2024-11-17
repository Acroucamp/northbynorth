import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  order_id: string;

  @Column()
  order_number: string;

  @Column({
    type: 'timestamp',
  })
  order_date: Date;

  @Column({
    type: 'varchar',
    default: 'pending',
  })
  order_status: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  order_total: number;

  @Column('json')
  user_address: Record<string, any>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
