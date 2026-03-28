import React, { useState } from 'react';
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  const fields = [
    {
      label: 'Name',
      type: 'text',
      value: currName,
      onChange: (e) => setCurrName(e.target.value),
    },
    {
      label: 'Type',
      type: 'select',
      value: inputType,
      onChange: (e) => setInputType(e.target.value),
      options: ['Text', 'File'],
    },
  ];
  const handles = [{ type: 'source', position: Position.Right, id: `${id}-value` }];
  return <BaseNode id={id} title="Input" fields={fields} handles={handles} />;
};
