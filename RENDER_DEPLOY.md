# Deploying "Syndicate Grand Library" to Render

This package is completely self-contained with the FastAPI backend, pre-built React/Vite SPA, all 150 books (with 'Bound by Spite: Slay Gonçalves' by Kisha & Yasin as the flagship), character dossiers, audio narrator, real photographic covers, and real in-character direct chat.

---

### Option 1: Automatic Blueprint (Easiest)
1. Push this folder to a GitHub repository (e.g. `github.com/your-username/bound-by-spite`).
2. Log into your [Render Dashboard](https://dashboard.render.com).
3. Click **New +** → **Blueprint**.
4. Select your GitHub repository.
5. Render will automatically read `render.yaml`, install dependencies, build the frontend, and launch the web service!

---

### Option 2: Deploy as a Standard Web Service
1. In Render Dashboard, click **New +** → **Web Service**.
2. Select your repository.
3. Configure the settings:
   - **Environment:** `Python`
   - **Build Command:** `npm install && npm run build && pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Click **Deploy Web Service**.

---

### Option 3: Deploy via Docker (Guaranteed 1-Click)
1. In Render Dashboard, click **New +** → **Web Service**.
2. Select your repository.
3. Select **Docker** as the runtime.
4. Render will automatically build the included multi-stage `Dockerfile`.
5. Your library will be live on Render with an `onrender.com` URL!
