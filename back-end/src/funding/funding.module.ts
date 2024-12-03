import { Module } from '@nestjs/common';
import { FundingsService } from './funding.service';
import { FundingsController } from './funding.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsModule } from 'src/students/students.module';
import { Funding } from './funding.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Funding]),
    StudentsModule, // For linking students to funding
  ],
  providers: [FundingsService],
  exports: [TypeOrmModule],
  controllers: [FundingsController]
})
export class FundingModule {}
