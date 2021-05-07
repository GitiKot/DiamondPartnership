import { Test, TestingModule } from '@nestjs/testing';
import { UseresService } from './useres.service';

describe('SalesService', () => {
  let service: UseresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UseresService],
    }).compile();

    service = module.get<UseresService>(UseresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
