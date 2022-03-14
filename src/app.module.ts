import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HandFingersModule } from './module/hand-fingers/hand-fingers.module';

@Module({
  imports: [HandFingersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
