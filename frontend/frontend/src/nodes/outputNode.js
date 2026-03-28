import React, { useState } from 'react';
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

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
      value: outputType,
      onChange: (e) => setOutputType(e.target.value),
      options: ['Text', 'File'],
    },
  ];
  const handles = [{ type: 'target', position: Position.Left, id: `${id}-value` }];
  return <BaseNode id={id} title="Output" fields={fields} handles={handles} />;
};
