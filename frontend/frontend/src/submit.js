import { useState } from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);
    const [diagnosticData, setDiagnosticData] = useState(null);

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('pipeline', JSON.stringify({ nodes, edges }));
            
            const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
            const response = await fetch(`${API_BASE_URL}/pipelines/parse`, {
                method: 'POST',
                body: formData,
            });
            
            if (response.ok) {
                const data = await response.json();
                setDiagnosticData({
                    status: 'success',
                    title: 'Topological Analysis Complete',
                    nodes: data.num_nodes,
                    edges: data.num_edges,
                    isDag: data.is_dag
                });
            } else {
                setDiagnosticData({
                    status: 'error',
                    title: 'Diagnostic Failure',
                    message: 'Failed to process pipeline topology. Backend exception occurred.'
                });
            }
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            setDiagnosticData({
                status: 'error',
                title: 'Connection Terminated',
                message: 'Unable to establish link with backend server.'
            });
        }
    };

    const closeModal = () => setDiagnosticData(null);

    return (
        <>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'}}>
                <button 
                    type="button"
                    onClick={handleSubmit}
                    style={{
                        padding: '12px 32px',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color: '#fff',
                        background: 'var(--accent-gradient)',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        boxShadow: 'var(--shadow-md), var(--glass-rim)',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        letterSpacing: '1px'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.5)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'none';
                        e.currentTarget.style.boxShadow = '0 4px 14px 0 rgba(99, 102, 241, 0.39)';
                    }}
                    onMouseDown={(e) => {
                        e.currentTarget.style.transform = 'scale(0.95)';
                    }}
                >
                    Submit Pipeline
                </button>
            </div>

            {/* Elegant Diagnostics Modal */}
            {diagnosticData && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, width: '100vw', height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                    animation: 'fadeIn 0.3s ease-out'
                }}>
                    <div style={{
                        background: 'var(--bg-modal)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '20px',
                        padding: '32px',
                        maxWidth: '450px',
                        width: '90%',
                        boxShadow: 'var(--shadow-lg), var(--glass-rim)',
                        fontFamily: "'Inter', sans-serif",
                        color: 'var(--text-main)',
                        transform: 'translateY(0)',
                        animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}>
                        <div style={{ 
                            fontSize: '1.4rem', 
                            fontWeight: 700, 
                            marginBottom: '24px',
                            background: diagnosticData.status === 'success' 
                                ? 'linear-gradient(135deg, #34d399 0%, #10b981 100%)'
                                : 'linear-gradient(135deg, #f87171 0%, #ef4444 100%)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textAlign: 'center',
                            letterSpacing: '0.5px'
                        }}>
                            {diagnosticData.title}
                        </div>

                        {diagnosticData.status === 'success' ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                                    <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>System Nodes:</span>
                                    <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{diagnosticData.nodes}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                                    <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Graph Edges:</span>
                                    <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{diagnosticData.edges}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                                    <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Acyclic Topology:</span>
                                    <span style={{ 
                                        fontWeight: 600, 
                                        color: diagnosticData.isDag ? 'var(--success-color)' : 'var(--error-color)' 
                                    }}>
                                        {diagnosticData.isDag ? 'Verified' : 'Violation Detected'}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div style={{ 
                                color: 'var(--error-color)', 
                                marginBottom: '32px', 
                                textAlign: 'center',
                                lineHeight: '1.6',
                                background: 'var(--error-bg)',
                                padding: '16px',
                                borderRadius: '12px',
                                border: '1px solid var(--border-color)'
                            }}>
                                {diagnosticData.message}
                            </div>
                        )}

                        <button 
                            onClick={closeModal}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '10px',
                                border: '1px solid var(--border-color)',
                                background: 'var(--btn-bg)',
                                color: 'var(--text-main)',
                                fontSize: '1rem',
                                fontWeight: 500,
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                letterSpacing: '0.5px'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.background = 'var(--btn-hover)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.background = 'var(--btn-bg)';
                            }}
                        >
                            Acknowledge
                        </button>
                    </div>
                </div>
            )}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
            `}</style>
        </>
    );
}
