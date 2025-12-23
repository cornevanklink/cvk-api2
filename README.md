# cvk-serverless-base

A minimal Node.js base project that uses `node-fetch` and is ready to be packaged for a Scaleway Serverless Function or run as a container.

## Features ✅
- Simple HTTP dev server (for local testing)
- `export`ed ESM handler `index.handler` for serverless uploads (ESM)
- Uses `node-fetch` (v3) as an ESM dependency
- `Dockerfile` and `package:function` helper to create a ZIP

---

## Quick start (local)

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm start
# then open http://localhost:3000/?q=yourname
```

3. Use the packaged handler when deploying to a serverless platform; the handler exported is `index.handler`.

---

## Packaging for Scaleway Functions (ZIP upload)

Option A — Zip upload (quick):

1. Run `npm install --production` (or just `npm install` locally).
2. Create a ZIP that contains `index.js`, `package.json` and `node_modules`:

```bash
npm run package:function
```

3. In the Scaleway Console create a Function, choose **Node.js (18.x)** runtime, and upload the ZIP. Ensure the entry point is `index.handler` (some upload UIs will ask for the handler name).

Option B — Container (recommended for more control):

1. Build the Docker image:

```bash
docker build -t myregistry/myimage:tag .
```

2. Push to your registry and create a Scaleway Serverless Container using the pushed image.

---

## Dockerfile

A simple `Dockerfile` is included for container-based deployments.

---

## Notes / Tips 💡
- This project now uses **ECMAScript modules** (`"type": "module"` in `package.json`) and `node-fetch@^3`.
- This project uses **ECMAScript modules** (`"type": "module"` in `package.json`) and `node-fetch@^3`. Use `index.handler` as the entry point when uploading the ZIP to an ESM-capable runtime.

---

If you want, I can also add a CI job to build and automatically package and/or publish an image to a registry. 👍
