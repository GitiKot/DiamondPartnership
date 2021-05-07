import { Test, TestingModule } from '@nestjs/testing';
import { UseresController } from './useres.controller';

describe('SalesController', () => {
  let controller: UseresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UseresController],
    }).compile();

    controller = module.get<UseresController>(UseresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
