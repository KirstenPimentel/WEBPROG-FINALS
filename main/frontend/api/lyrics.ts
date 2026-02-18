// main/frontend/api/lyrics.ts
import { createClient } from '@supabase/supabase-js';

// Read server-side env vars from Vercel
const supabaseUrl = process.env.SUPABASE_URL as string;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

if (!supabaseUrl || !serviceRoleKey) {
  console.warn('[API /api/lyrics] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

// Type for incoming POST body
type InsertBody = {
  text: string;
  song_title?: string | null;
  era?: string | null;
  author_name?: string | null;
};

// No TS dependency on @vercel/node to avoid build complaints
export default async function handler(req: any, res: any) {
  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('lyrics')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return res.status(200).json(data ?? []);
    }

    if (req.method === 'POST') {
      const body = (req.body ?? {}) as InsertBody;

      if (!body.text || !body.text.trim()) {
        return res.status(400).json({ message: 'Text (lyric) is required.' });
      }

      const payload = {
        text: body.text.trim(),
        song_title: body.song_title ?? null,
        era: body.era ?? null,
        author_name: body.author_name ?? null,
      };

      const { data, error } = await supabase
        .from('lyrics')
        .insert(payload)
        .select('*')
        .single();

      if (error) throw error;
      return res.status(201).json(data);
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (e: any) {
    console.error('[API /api/lyrics] error:', e);
    const message = e?.message || 'Internal Server Error';
    return res.status(500).json({ message });
  }
}