import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../auth/auth.module';
import { HandFingersController } from './hand-fingers.controller';
import { HandFingersGateway } from './hand-fingers.gateway';
import { HandFingersService } from './hand-fingers.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), AuthModule],
  controllers: [HandFingersController],
  providers: [HandFingersService, HandFingersGateway],
})
export class HandFingersModule { }
