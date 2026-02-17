import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

type LyricRow = {
  id: string;
  text: string;
  song_title: string | null;
  era: string | null;
  created_at: string;
  author_name: string | null;
};

@Injectable()
export class LyricsService {
  private supabase = createClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_ROLE_KEY as string
  );


async list(): Promise<LyricRow[]> {
  const { data, error } = await this.supabase
    .from('lyrics')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[SUPABASE SELECT ERROR]', error); // ⬅️ TEMP LOG
    throw error;
  }
  return data ?? [];
}


  async create(input: {
    text: string;
    song_title?: string;
    era?: string;
    author_name?: string;
  }): Promise<LyricRow> {
    const { data, error } = await this.supabase
      .from('lyrics')
      .insert({
        text: input.text,
        song_title: input.song_title ?? null,
        era: input.era ?? null,
        author_name: input.author_name ?? null,
      })
      .select('*')
      .single();
    if (error) throw error;
    return data as LyricRow;
  }
}