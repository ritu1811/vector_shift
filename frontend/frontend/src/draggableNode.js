export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      style={{ 
        cursor: 'grab', 
        minWidth: '100px', 
        height: '46px',
        display: 'flex', 
        alignItems: 'center', 
        borderRadius: '10px',
        background: 'var(--bg-modal)',
        border: '1px solid var(--border-color)',
        justifyContent: 'center', 
        flexDirection: 'column',
        boxShadow: 'var(--shadow)',
        transition: 'all 0.2s ease',
        userSelect: 'none'
      }}
      draggable
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1), 0 0 0 1px var(--handle-border)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = 'var(--shadow)';
      }}
    >
      <span style={{ color: 'var(--text-main)', fontWeight: 500, letterSpacing: '0.5px' }}>{label}</span>
    </div>
  );
};