import { Module } from '@nestjs/common';
import { InstitutionsService } from './institutions.service';
import { InstitutionsController } from './institutions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institution } from './institution.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Institution])],
  providers: [InstitutionsService],
  exports: [TypeOrmModule],
  controllers: [InstitutionsController]
})

export class InstitutionsModule {}
