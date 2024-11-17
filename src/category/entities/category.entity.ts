import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('categories_tbl')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  category_id: string;

  @Column()
  category_name: string;

  @Column()
  category_description: string;

  @Column()
  category_level: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
