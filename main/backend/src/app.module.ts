import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LyricsController } from './lyrics.controller';
import { LyricsService } from './lyrics.service';

@Module({
  imports: [],
  controllers: [AppController, LyricsController],
  providers: [LyricsService],
})
export class AppModule {}
``