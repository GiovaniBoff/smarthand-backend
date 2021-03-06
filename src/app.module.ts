import { Module } from '@nestjs/common';
import { HandFingersModule } from './module/hand-fingers/hand-fingers.module';
import { AuthModule } from './module/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { HandPoseModule } from './module/hand-pose/hand-pose.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, HandFingersModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
