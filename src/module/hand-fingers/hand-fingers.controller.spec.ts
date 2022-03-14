import { Test, TestingModule } from '@nestjs/testing';
import { HandFingersController } from './hand-fingers.controller';

describe('HandFingersController', () => {
  let controller: HandFingersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HandFingersController],
    }).compile();

    controller = module.get<HandFingersController>(HandFingersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
