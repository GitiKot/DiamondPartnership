import { Test, TestingModule } from '@nestjs/testing';
import { SeriousnessController } from './seriousness.controller';

describe('SeriousnessController', () => {
  let controller: SeriousnessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeriousnessController],
    }).compile();

    controller = module.get<SeriousnessController>(SeriousnessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
