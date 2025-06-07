import React from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (val: string) => void;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => (
  <textarea
    className="w-full border rounded p-2"
    rows={6}
    value={value}
    onChange={e => onChange(e.target.value)}
  />
);

export default RichTextEditor;
