import { Module } from '@nestjs/common';
import { FraudReportController } from './fraud-report.controller';
import { FraudReportService } from './fraud-report.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FraudReport, FraudReportSchema } from 'src/schemas/fraud-report.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: FraudReport.name, schema: FraudReportSchema}])
  ],
  controllers: [FraudReportController],
  providers: [FraudReportService]
})
export class FraudReportModule {}
