import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Student } from '../students/student.entity';

@Entity()
export class Funding {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal')
  tuitionFees: number;

  @Column('decimal')
  financialAid: number;

  @Column('decimal', { default: 0 })
  totalDebt: number;

  @Column('decimal', { nullable: true })
  amountRepaid: number;

  @ManyToOne(() => Student, (student) => student.funding)
  student: Student;


  @Column({ default: true })
  isActive: boolean; // Tracks if funding is actively being repaid
}
