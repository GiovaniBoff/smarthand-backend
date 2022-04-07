import { Module } from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../auth/auth.module';
import { HandPoseModule } from '../hand-pose/hand-pose.module';
import { HandPoseService } from '../hand-pose/hand-pose.service';

import { HandFingersController } from './hand-fingers.controller';
import { HandFingersGateway } from './hand-fingers.gateway';
import { HandFingersService } from './hand-fingers.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    HandPoseModule,
  ],
  controllers: [HandFingersController],
  providers: [HandFingersService, HandPoseService],
})
export class HandFingersModule { }
