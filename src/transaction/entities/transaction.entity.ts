import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('transactions_tbl')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  transaction_id: string;

  @Column()
  reference: string;

  @Column()
  amount: number;

  @Column()
  currency: string;

  @Column()
  status: string;

  @Column()
  gateway_response: string;

  @Column()
  channel: string;

  @Column()
  customer_id: string;

  @Column()
  customer_email: string;

  @Column()
  customer_code: string;

  @Column()
  authorization_code: string;

  @Column()
  last4: string;

  @Column()
  card_type: string;

  @Column()
  card_brand: string;

  @Column({
    default: 0,
  })
  reusable: number;

  @Column()
  fees: number;

  @CreateDateColumn()
  paid_at: Date;

  @CreateDateColumn()
  transaction_date: Date;

  @CreateDateColumn()
  created_at: Date;
}
