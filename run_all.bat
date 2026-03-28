@echo off
start "Backend" cmd /k "cd /d %~dp0\backend && uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000"
start "Frontend" cmd /k "cd /d %~dp0\frontend\frontend && npm start"
