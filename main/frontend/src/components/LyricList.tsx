import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { LyricRow } from '../types';

export default function LyricList({ refreshToken }: { refreshToken: number }) {
  const [rows, setRows] = useState<LyricRow[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const load = async () => {
    setErrorMsg(null);
    const { data, error } = await supabase
      .from('lyrics')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      setErrorMsg(error.message);
      return;
    }
    setRows(data as LyricRow[]);
  };

  useEffect(() => {
    load();
  }, [refreshToken]);

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      {errorMsg && (
        <div className="footer-note" style={{ color: '#ff6b6b', marginBottom: '0.75rem' }}>
          {errorMsg}
        </div>
      )}
      {rows.map((r) => (
        <div key={r.id} className="lyric-card" style={{ marginBottom: '1rem' }}>
          <div className="lyric-text" style={{ whiteSpace: 'pre-wrap' }}>{r.text}</div>
          <div className="footer-note">
            {r.song_title ? <><strong>{r.song_title}</strong> · </> : null}
            {r.era ? <>{r.era} · </> : null}
            {r.author_name ? <>by {r.author_name} · </> : null}
            {new Date(r.created_at).toLocaleString()}
          </div>
        </div>
      ))}
      {rows.length === 0 && (
        <div className="footer-note" style={{ textAlign: 'center' }}>
          No lyrics yet. Be the first to post one.
        </div>
      )}
    </div>
  );
}