import { Test, TestingModule } from '@nestjs/testing';
import { seriousnessService } from './seriousness.service';

describe('ExpensesService', () => {
  let service: seriousnessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [seriousnessService],
    }).compile();

    service = module.get<seriousnessService>(seriousnessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
