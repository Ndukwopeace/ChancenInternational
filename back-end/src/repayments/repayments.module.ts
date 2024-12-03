import { Module } from '@nestjs/common';
import { RepaymentsService } from './repayments.service';
import { RepaymentsController } from './repayments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repayment } from './repayment.entity';
import { FundingModule } from 'src/funding/funding.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Repayment]),
    FundingModule, // Link repayments to funding
  ],
  providers: [RepaymentsService],
  exports: [TypeOrmModule],
  controllers: [RepaymentsController]
})
export class RepaymentsModule {}
