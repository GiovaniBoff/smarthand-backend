import { Test, TestingModule } from '@nestjs/testing';
import { HandFingersGateway } from '../hand-fingers.gateway';

describe('HandFingersGateway', () => {
  let gateway: HandFingersGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HandFingersGateway],
    }).compile();

    gateway = module.get<HandFingersGateway>(HandFingersGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
