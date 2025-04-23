import { Test, TestingModule } from '@nestjs/testing';
import { FraudReportController } from './fraud-report.controller';

describe('FraudReportController', () => {
  let controller: FraudReportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FraudReportController],
    }).compile();

    controller = module.get<FraudReportController>(FraudReportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
