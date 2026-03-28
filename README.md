# 🚀 VectorShift Pipeline Builder

VectorShift Pipeline Builder is a sophisticated, full-stack visual programming application that empowers users to design, manipulate, and evaluate complex topological graphs directly from their web browser. Built on a cutting-edge technology stack featuring React Flow, Zustand, and FastAPI, the application seamlessly bridges the gap between intricate computational logic and highly intuitive user experiences. 

At its core, the frontend enables users to place, connect, and configure various functional abstractions—such as Custom Inputs, LLM Integrations, dynamic Text fields, and Output handlers—onto an infinite, free-flowing canvas. The state of this complex workspace is managed cleanly using Zustand, allowing for real-time edge connections, topology tracing, and reactive layout updates. Every drag, drop, and scroll interaction feels fluid and aggressively responsive, providing an enterprise-grade developer experience.

Visually, VectorShift has been meticulously engineered to feature a stunning, state-of-the-art glassmorphism aesthetic. The custom UI integrates multi-layered 3D node lifting effects, dramatic volumetric drop-shadows, and dynamic translucent frosted-glass panels. To maximize aesthetic impact and accessibility, the platform includes a heavily refined, bespoke theme system. With a single click of a floating toggle, the entire interface orchestrates a smooth transition between an ultra-crisp, indigo-accented Light Mode and a sleek, jewel-toned Dark Mode—complete with an ambient pulsing background orb that dynamically provides stunning atmospheric depth to the digital workspace.

When a user is ready to evaluate their logic, the React frontend serializes the entire node architecture and deploys it effortlessly to the high-performance Python server. Powered by FastAPI and computational graph theory tools, the backend meticulously parses the incoming JSON payloads. It instantly calculates execution pathways and performs a rigorous topological sort to guarantee that the system represents a valid Directed Acyclic Graph (DAG) entirely free of cyclic dependencies or infinite loops. The diagnostic results are then rapidly returned to the frontend and materialized in an elegant, responsive modal, completing a high-speed and beautiful pipeline evaluation cycle from end to end.

---

## 🛠 Tech Stack
* **Frontend:** React, React Flow, Zustand (State Management), Native CSS Variables.
* **Backend:** Python, FastAPI, Pydantic, Uvicorn, NetworkX.

## 🚀 Quick Start (Local Setup)

### 1. Start the Backend Server
Navigate to the `backend` directory and install the required dependencies:
```bash
cd backend
pip install -r requirements.txt
python main.py
```

### 2. Launch the Web Interface
In a new terminal window, load up the React frontend:
```bash
cd frontend/frontend
npm install
npm start
```
> The application canvas will execute natively on port `3000`. Build your first pipeline and watch the magic happen!
