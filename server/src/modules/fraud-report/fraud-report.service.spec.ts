import { Test, TestingModule } from '@nestjs/testing';
import { FraudReportService } from './fraud-report.service';

describe('FraudReportService', () => {
  let service: FraudReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FraudReportService],
    }).compile();

    service = module.get<FraudReportService>(FraudReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
