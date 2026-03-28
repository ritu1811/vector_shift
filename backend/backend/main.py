from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
import json
from collections import defaultdict, deque

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Backend is working'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: str = Form(...)):
    try:
        data = json.loads(pipeline)
        nodes = data.get('nodes', [])
        edges = data.get('edges', [])
    except json.JSONDecodeError:
        nodes = []
        edges = []

    num_nodes = len(nodes)
    num_edges = len(edges)
    
    # To check for DAG, we use Kahn's algorithm for topological sorting
    graph = defaultdict(list)
    in_degree = defaultdict(int)
    
    # Initialize in_degree for all nodes
    for node in nodes:
        in_degree[node['id']] = 0
        
    for edge in edges:
        source = edge.get('source')
        target = edge.get('target')
        if source and target:
            graph[source].append(target)
            in_degree[target] += 1
            
    queue = deque([n for n in in_degree if in_degree[n] == 0])
    visited_count = 0
    
    while queue:
        curr = queue.popleft()
        visited_count += 1
        
        for neighbor in graph[curr]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
                
    is_dag = visited_count == num_nodes if num_nodes > 0 else True

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag
    }

if __name__ == '__main__':
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
