import { Module } from '@nestjs/common';
import { HandPoseService } from './hand-pose.service';

@Module({
  providers: [HandPoseService],
  exports: [HandPoseService],
})
export class HandPoseModule {}
