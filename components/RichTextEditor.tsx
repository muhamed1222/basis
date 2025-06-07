import React from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (val: string) => void;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const exec = (command: string, arg?: string) => {
    document.execCommand(command, false, arg);
    ref.current && ref.current.focus();
  };

  const handleInput = () => {
    onChange(ref.current?.innerHTML || '');
  };

  React.useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value;
    }
  }, [value]);

  return (
    <div>
      <div className="mb-1 space-x-1">
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            exec('bold');
          }}
          className="px-1 border rounded text-sm"
        >
          B
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            exec('italic');
          }}
          className="px-1 border rounded text-sm"
        >
          I
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            const url = prompt('URL');
            if (url) exec('createLink', url);
          }}
          className="px-1 border rounded text-sm"
        >
          Link
        </button>
      </div>
      <div
        ref={ref}
        contentEditable
        onInput={handleInput}
        className="border rounded p-2 min-h-[40px] focus:outline-none"
      >
        {/** value is set via effect */}
      </div>
    </div>
  );
};
