---
description: Run Frontend and Backend of VectorShift Project
---

## Prerequisites
- **Python 3.9+** installed.
- **Node.js 18+** and **npm** installed.
- Internet connection to download dependencies.

## Steps
1. **Backend Setup**
   ```bash
   # Navigate to backend directory
   cd backend
   # (Optional) Create a virtual environment
   python -m venv venv
   venv\Scripts\activate   # Windows
   # Install dependencies
   pip install fastapi uvicorn python-multipart
   # If a requirements.txt is preferred, you can generate one:
   pip freeze > requirements.txt
   ```
2. **Run Backend**
   ```bash
   # Ensure you are in the backend directory
   uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
   ```
   The API will be available at `http://localhost:8000`.

3. **Frontend Setup**
   ```bash
   # Open a new terminal window/tab
   cd frontend/frontend
   npm install
   ```
4. **Run Frontend**
   ```bash
   npm start
   ```
   This starts the React development server at `http://localhost:3000` and proxies API requests to the backend (if needed, configure `proxy` in `package.json`).

5. **Verify**
   - Open a browser and navigate to `http://localhost:3000` to see the UI.
   - The backend health endpoint can be checked at `http://localhost:8000/` (should return `{ "Ping": "Pong" }`).

## Optional: Combined Script
You can create a simple batch file to launch both services simultaneously:
```bat
@echo off
start "Backend" cmd /k "cd /d %~dp0\backend && uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000"
start "Frontend" cmd /k "cd /d %~dp0\frontend\frontend && npm start"
```
Save this as `run_all.bat` in the project root and double‑click to launch both.

---
**Note**: Adjust ports or hostnames if they conflict with existing services.
