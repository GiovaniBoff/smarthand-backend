import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { HandFingersController } from './hand-fingers.controller';
import { HandFingersGateway } from './hand-fingers.gateway';
import { HandFingersService } from './hand-fingers.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [HandFingersController],
  providers: [HandFingersService, HandFingersGateway],
})
export class HandFingersModule {}
