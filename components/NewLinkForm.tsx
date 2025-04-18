'use client';

import { useState } from 'react';

export default function NewLinkForm() {
  const [url, setUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setShortUrl('');
    setCopied(false);

    const res = await fetch('/api/create-link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, alias }),
    });

    const data = await res.json();

    if (res.ok) {
      const newUrl = `${window.location.origin}/r/${alias}`;
      setShortUrl(newUrl);
      setUrl('');
      setAlias('');
    } else {
      setError(data.error || 'An error occurred');
    }
  };

  const copyToClipboard = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        className="border p-2 w-full rounded"
        placeholder="Enter full URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <input
        type="text"
        className="border p-2 w-full rounded"
        placeholder="Custom alias"
        value={alias}
        onChange={(e) => setAlias(e.target.value)}
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Shorten URL
      </button>

      {shortUrl && (
        <div className="bg-green-50 border border-green-300 p-3 rounded">
          <p className="text-green-700 font-medium">Shortened URL:</p>
          <div className="flex items-center gap-2 mt-1">
            <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline break-all">
              {shortUrl}
            </a>
            <button
              onClick={copyToClipboard}
              type="button"
              className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded hover:bg-blue-200"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      )}

      {error && <div className="text-red-600 font-semibold">{error}</div>}
    </form>
  );
}