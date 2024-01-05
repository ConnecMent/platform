import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  username: string;

  @Column('varchar')
  password: string;

  @Column('integer')
  balance: number;

  @Column('boolean')
  isAdmin: boolean;
}
