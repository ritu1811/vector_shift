import React, { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';
import { Position, useUpdateNodeInternals } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);

  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    // Regex matches valid JS-like variable names within {{ }}
    const matches = [...currText.matchAll(/\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}/g)].map((m) => m[1]);
    const uniqueVars = [...new Set(matches)];
    setVariables(uniqueVars);
  }, [currText]);

  useEffect(() => {
    updateNodeInternals(id);
  }, [variables, id, updateNodeInternals]);

  // Adjust node size based on text length to improve visibility
  const width = Math.min(350, Math.max(250, currText.length * 6 + 40));
  const height = Math.min(250, Math.max(150, Math.ceil(currText.length / 25) * 20 + 85));

  const fields = [
    {
      label: 'Text',
      type: 'textarea',
      value: currText,
      onChange: (e) => setCurrText(e.target.value),
    },
  ];

  const handles = [
    { type: 'source', position: Position.Right, id: `${id}-output` },
  ];

  // Distribute target handles evenly across the left side if multiple
  variables.forEach((v, index) => {
    handles.push({
      type: 'target',
      position: Position.Left,
      id: `${id}-${v}`,
      style: { top: `${((index + 1) / (variables.length + 1)) * 100}%` },
    });
  });

  return (
    <BaseNode
      id={id}
      title="Text"
      fields={fields}
      handles={handles}
      style={{ width, height, transition: 'all 0.2s ease' }}
    />
  );
};
