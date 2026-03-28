// src/nodes/BaseNode.js
import React from 'react';
import { Handle } from 'reactflow';
import './nodeStyles.css';

export const BaseNode = ({ id, title, fields = [], handles = [], style = {}, children }) => {
  return (
    <div className="node-card" style={style}>
      <div className="node-header">{title}</div>
      <div className="node-body">
        {fields.map((f, idx) => (
          <div className="node-field" key={idx} style={f.type === 'textarea' ? { flexGrow: 1 } : {}}>
            <label className="node-label">{f.label}:</label>
            {f.type === 'select' ? (
              <select
                value={f.value}
                onChange={f.onChange}
                className="node-input"
              >
                {f.options && f.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : f.type === 'textarea' ? (
              <textarea
                value={f.value}
                onChange={f.onChange}
                className="node-input"
                style={{ resize: 'none' }}
              />
            ) : (
              <input
                type={f.type}
                value={f.value}
                onChange={f.onChange}
                className="node-input"
              />
            )}
          </div>
        ))}
        {children}
      </div>
      {/* Render handles */}
      {handles.map((h, i) => {
        return (
          <Handle
            key={h.id || i}
            type={h.type}
            position={h.position}
            id={h.id}
            className="node-handle"
            style={h.style}
          />
        );
      })}
    </div>
  );
};
