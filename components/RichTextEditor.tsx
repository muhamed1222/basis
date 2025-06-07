import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import ReactMarkdown from 'react-markdown';

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export const RichTextEditor: React.FC<Props> = ({ value, onChange }) => {
  const clean = DOMPurify.sanitize(value);
  return (
    <div className="space-y-2">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Описание"
        className="border rounded w-full p-2 h-32"
      />
      <div className="border rounded p-2 bg-gray-50">
        <ReactMarkdown>{clean}</ReactMarkdown>
      </div>
    </div>
  );
};
