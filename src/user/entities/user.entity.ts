import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({
    unique: true,
  })
  email_address: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  hashed_password: string;

  @Column({
    nullable: true,
  })
  reset_password_token?: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  reset_password_expires?: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
