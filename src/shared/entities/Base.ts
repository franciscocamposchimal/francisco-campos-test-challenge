import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class Base {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    select: false,
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt?: Date;

  @UpdateDateColumn({
    select: false,
    type: 'timestamptz',
    default: null,
  })
  updatedAt?: Date;
}
