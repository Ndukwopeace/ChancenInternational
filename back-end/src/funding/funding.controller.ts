import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { FundingsService } from './funding.service';
import { Funding } from './funding.entity';

@Controller('fundings')
export class FundingsController {
  constructor(private readonly fundingsService: FundingsService) {}

  @Get()
  async findAll(): Promise<Funding[]> {
    return this.fundingsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Funding> {
    return this.fundingsService.findOne(+id);
  }

  @Post()
  async create(
    @Body() createDto: { studentId: number; tuitionFees: number; financialAid: number },
  ): Promise<Funding> {
    const { studentId, tuitionFees, financialAid } = createDto;
    return this.fundingsService.create(studentId, tuitionFees, financialAid);
  }

  @Patch(':id/repayment')
  async updateRepayment(
    @Param('id') id: string,
    @Body() updateDto: { amountRepaid: number },
  ): Promise<Funding> {
    const { amountRepaid } = updateDto;
    return this.fundingsService.updateRepayment(+id, amountRepaid);
  }

  @Patch(':id/suspend')
  async suspendRepayment(@Param('id') id: string): Promise<Funding> {
    return this.fundingsService.suspendRepayment(+id);
  }

  @Patch(':id/resume')
  async resumeRepayment(@Param('id') id: string): Promise<Funding> {
    return this.fundingsService.resumeRepayment(+id);
  }

  @Get(':id/remaining-debt')
  async calculateRemainingDebt(@Param('id') id: string): Promise<number> {
    return this.fundingsService.calculateRemainingDebt(+id);
  }

  @Get(':id/repayment-percentage')
  async calculateRepaymentPercentage(@Param('id') id: string): Promise<number> {
    return this.fundingsService.calculateRepaymentPercentage(+id);
  }
  
}

export default FundingsController