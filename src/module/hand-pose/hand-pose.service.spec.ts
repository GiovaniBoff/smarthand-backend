import { Test, TestingModule } from '@nestjs/testing';
import { HandPoseService } from './hand-pose.service';

describe('HandPoseService', () => {
  let service: HandPoseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HandPoseService],
    }).compile();

    service = module.get<HandPoseService>(HandPoseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
