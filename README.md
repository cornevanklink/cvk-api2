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

## Continuous Integration (CI) — GitHub Actions ✅

I added two simple GitHub Actions workflows under `.github/workflows`:

- `package-zip.yml` — runs on push to `main` and on Release:
  - Installs dependencies, runs `npm run package:function`, uploads `function.zip` as an artifact
  - On release publishes, it also attaches `function.zip` to the GitHub Release

- `docker-publish.yml` — runs on push to `main` and on Release:
  - Builds a multi-arch Docker image and **pushes to GitHub Container Registry (GHCR)** as
    `ghcr.io/<owner>/cvk-serverless-base:latest` and with the current commit SHA tag

### Notes / usage 🔧
- GHCR: the workflows use the automatic `GITHUB_TOKEN` to authenticate to `ghcr.io`. Ensure repository permissions allow Actions to write packages (default for most repos). If you prefer Docker Hub, I can switch the workflow to use `DOCKERHUB_USERNAME` / `DOCKERHUB_TOKEN` secrets instead.
- The ZIP workflow attaches the `function.zip` artifact which you can download from the workflow run or from the release.

---

If you want, I can also:
- Add a Release workflow that automatically creates a GitHub Release when a tag is pushed, or
- Add a workflow to publish the ZIP as a release artifact and the Docker image on every tagged release only.

Just tell me which flavor you prefer and I’ll update the workflows.
