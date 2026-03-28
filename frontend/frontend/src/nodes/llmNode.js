import React from 'react';
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const LLMNode = ({ id, data }) => {
  const fields = [];
  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-system`, style: { top: `${100/3}%` } },
    { type: 'target', position: Position.Left, id: `${id}-prompt`, style: { top: `${200/3}%` } },
    { type: 'source', position: Position.Right, id: `${id}-response` },
  ];
  return (
    <BaseNode id={id} title="LLM" fields={fields} handles={handles}>
      <div style={{ padding: '8px 0', fontSize: '0.85rem' }}>This is a LLM.</div>
    </BaseNode>
  );
};
