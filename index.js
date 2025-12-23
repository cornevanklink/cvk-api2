import http from 'http';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';

export async function handler(event, context) {
  // Support simple GET query param ?q=...
  const q = (event && event.queryStringParameters && event.queryStringParameters.q) || 'world';

  try {
    const r = await fetch('https://api.github.com/');
    const json = await r.json();

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: `Hello ${q}`, github_info: json })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message })
    };
  }
}

// Simple local dev server for testing the same logic via HTTP
// Run when script is executed directly (not imported)
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = process.env.PORT || 3000;

  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    if (url.pathname === '/') {
      const q = url.searchParams.get('q') || 'world';
      try {
        const r = await fetch('https://api.github.com/');
        const json = await r.json();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: `Hello ${q}`, github_info: json }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
    }
  });

  server.listen(port, () => console.log(`Dev server listening on http://localhost:${port}`));
}
