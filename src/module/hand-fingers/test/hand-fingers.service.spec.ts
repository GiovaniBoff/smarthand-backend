import { Test, TestingModule } from '@nestjs/testing';
import { HandFingersService } from '../hand-fingers.service';

describe('HandFingersService', () => {
  let service: HandFingersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HandFingersService],
    }).compile();

    service = module.get<HandFingersService>(HandFingersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
