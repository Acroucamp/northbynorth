import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products_tbl')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  product_id: string;

  @Column()
  product_name: string;

  @Column()
  product_description: string;

  @Column()
  category_id: string;

  @Column()
  product_amount: number;

  @Column()
  product_discount: number;

  @Column()
  disount_code: string;

  @Column()
  availability: number;

  @Column()
  product_image: string;

  @Column()
  rewievs_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
