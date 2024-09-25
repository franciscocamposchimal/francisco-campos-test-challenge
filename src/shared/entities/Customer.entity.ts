import { Column, Entity } from 'typeorm';
import { Base } from './Base';

@Entity('customers')
export class Customer extends Base {
  @Column({ type: 'varchar', unique: true })
  customerId: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  firstName: string;

  @Column({ type: 'varchar', nullable: true })
  lastName: string;
}
