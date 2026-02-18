import './index.css';
import { useState } from 'react';
import LyricForm from './components/LyricForm';
import LyricList from './components/LyricList';

function App() {
  const [refreshToken, setRefreshToken] = useState(0);

  return (
    <div className="app">
      <div style={{ width: '100%' }}>
        <div className="title" style={{ textAlign: 'center' }}>
          THE 1975 — LYRICS QUOTE BOARD
        </div>

        <LyricForm onCreated={() => setRefreshToken((n) => n + 1)} />
        <LyricList refreshToken={refreshToken} />
      </div>
    </div>
  );
}

export default App;