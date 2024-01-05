import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Relation
} from 'typeorm';
import { User } from './user';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne('User', 'id', {
    cascade: true,
  })
  from: Relation<User>;

  @ManyToOne('User', 'id', {
    cascade: true,
  })
  to: Relation<User>;

  @Column('integer')
  amount: number;

  @Column('varchar')
  note: string;

  @Column('integer')
  timestamp: number;
}
