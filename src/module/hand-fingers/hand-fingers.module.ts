import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { HandFingersController } from './hand-fingers.controller';
import { HandFingersService } from './hand-fingers.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [HandFingersController],
  providers: [HandFingersService],
})
export class HandFingersModule {}
