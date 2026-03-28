import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  return (
    <div style={{ padding: '20px' }}>
      <div 
        style={{ 
          marginTop: '10px', 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '16px',
          background: 'var(--bg-panel)',
          backdropFilter: 'blur(24px) saturate(150%)',
          padding: '16px 24px',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-lg), var(--glass-rim)',
          alignItems: 'center',
          transition: 'all 0.3s ease'
        }}
      >
        <div style={{ color: 'var(--text-muted)', fontWeight: 600, marginRight: '16px', letterSpacing: '0.5px' }}>
          COMPONENTS
        </div>
        <DraggableNode type='customInput' label='Input' />
        <DraggableNode type='llm' label='LLM' />
        <DraggableNode type='customOutput' label='Output' />
        <DraggableNode type='text' label='Text' />
      </div>
    </div>
  );
};
