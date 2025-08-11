import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import Admin from './Admin';

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/shorten', { original_url: longUrl });
      setShortUrl(`http://localhost:5000/${res.data.short_url}`);
      setError('');
    } catch (err) {
      setError('Error shortening URL');
      setShortUrl('');
    }
  };

  return (
    <Router>
      <div className="container">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/admin">Admin</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={
            <div>
              <h1>URL Shortener</h1>
              <form onSubmit={handleSubmit}>
                <input
                  type="url"
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                  placeholder="Enter URL"
                  required
                />
                <button type="submit">Shorten</button>
              </form>
              {error && <p className="error">{error}</p>}
              {shortUrl && (
                <div className="result">
                  <p>Short URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>
                </div>
              )}
            </div>
          } />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;