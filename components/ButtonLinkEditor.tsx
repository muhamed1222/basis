import React, { useState } from 'react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

interface Props {
  value: string;
  url: string;
  onTextChange: (val: string) => void;
  onUrlChange: (val: string) => void;
}

export const ButtonLinkEditor: React.FC<Props> = ({ value, url, onTextChange, onUrlChange }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleEmoji = (emojiData: EmojiClickData) => {
    onTextChange(value + emojiData.emoji);
  };

  return (
    <div className="space-y-2 relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder="Текст кнопки"
        className="border px-2 py-1 rounded w-full"
      />
      <input
        type="url"
        value={url}
        onChange={(e) => onUrlChange(e.target.value)}
        placeholder="https://example.com"
        className="border px-2 py-1 rounded w-full mt-1"
      />
      <button type="button" className="px-2 py-1 bg-gray-200 rounded" onClick={() => setShowPicker(!showPicker)}>
        😊
      </button>
      {showPicker && (
        <div className="absolute z-10 mt-2">
          <EmojiPicker onEmojiClick={handleEmoji} autoFocusSearch />
        </div>
      )}
    </div>
  );
};
