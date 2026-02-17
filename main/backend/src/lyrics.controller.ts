import { Body, Controller, Get, Post } from '@nestjs/common';
import { LyricsService } from './lyrics.service';

@Controller('lyrics')
export class LyricsController {
  constructor(private readonly lyricsService: LyricsService) {}

  @Get()
  async list() {
    return await this.lyricsService.list();
  }

  @Post()
  async create(
    @Body()
    body: {
      text: string;
      song_title?: string;
      era?: string;
      author_name?: string;
    }
  ) {
    if (!body.text || body.text.trim().length === 0) {
      return { error: 'Text (lyric) is required.' };
    }
    return await this.lyricsService.create(body);
  }
}