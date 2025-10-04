// server.js — shim that loads index.js so existing "node server.js" start scripts work.
// This file is intentionally minimal and provides a helpful error if index.js is missing.

try {
  require('./index.js');
} catch (err) {
  console.error('Error: failed to load ./index.js');
  console.error('Reason:', err && err.message ? err.message : err);
  console.error('Make sure you have an index.js file in the project root or update package.json to use a different entry (e.g. "node index.js").');
  process.exit(1);
}
