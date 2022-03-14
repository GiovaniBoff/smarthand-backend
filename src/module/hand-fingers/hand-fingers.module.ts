import { Module } from '@nestjs/common';
import { HandFingersController } from './hand-fingers.controller';
import { HandFingersService } from './hand-fingers.service';

@Module({
  controllers: [HandFingersController],
  providers: [HandFingersService]
})
export class HandFingersModule {}
