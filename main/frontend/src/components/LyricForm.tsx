import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function LyricForm({ onCreated }: { onCreated: () => void }) {
  const [text, setText] = useState('');
  const [songTitle, setSongTitle] = useState('');
  const [era, setEra] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!text.trim()) {
      setErrorMsg('Please enter a lyric.');
      return;
    }

    setLoading(true);
    const { error } = await supabase.from('lyrics').insert({
      text,
      song_title: songTitle || null,
      era: era || null,
      author_name: author || null,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    // clear inputs
    setText('');
    setSongTitle('');
    setEra('');
    setAuthor('');
    onCreated(); // refresh list
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 720, margin: '2rem auto' }}>
      <div className="lyric-card" style={{ textAlign: 'left' }}>
        <div className="title" style={{ textAlign: 'left' }}>Submit your favorite lyric</div>

        <label style={{ display: 'block', marginTop: '1rem' }}>
          <span className="title">Lyric *</span>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            style={{ width: '100%', marginTop: 8, background: 'transparent', color: 'white', border: '1px solid #444', padding: 12 }}
            placeholder='“Love me, if that’s what you wanna do”'
          />
        </label>

        <label style={{ display: 'block', marginTop: '1rem' }}>
          <span className="title">Song title (optional)</span>
          <input
            value={songTitle}
            onChange={(e) => setSongTitle(e.target.value)}
            style={{ width: '100%', marginTop: 8, background: 'transparent', color: 'white', border: '1px solid #444', padding: 12 }}
            placeholder="Love Me"
          />
        </label>

        <label style={{ display: 'block', marginTop: '1rem' }}>
          <span className="title">Era (optional)</span>
          <input
            value={era}
            onChange={(e) => setEra(e.target.value)}
            style={{ width: '100%', marginTop: 8, background: 'transparent', color: 'white', border: '1px solid #444', padding: 12 }}
            placeholder="ILIWYS / NOACF / ATVB"
          />
        </label>

        <label style={{ display: 'block', marginTop: '1rem' }}>
          <span className="title">Your name (optional)</span>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            style={{ width: '100%', marginTop: 8, background: 'transparent', color: 'white', border: '1px solid #444', padding: 12 }}
            placeholder="Kirsten"
          />
        </label>

        {errorMsg && (
          <div className="footer-note" style={{ color: '#ff6b6b', marginTop: '0.75rem' }}>
            {errorMsg}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: '1rem',
            width: '100%',
            padding: '0.75rem 1rem',
            background: loading ? '#333' : '#fff',
            color: loading ? '#999' : '#000',
            border: 'none',
            fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Submitting…' : 'Post Lyric'}
        </button>
      </div>
    </form>
  );
}
