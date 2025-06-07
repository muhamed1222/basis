import React, { useState } from 'react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

interface Props {
  value: string;
  onChange: (val: string) => void;
  maxLength?: number;
  placeholder?: string;
}

export const ButtonLinkEditor: React.FC<Props> = ({ value, onChange, maxLength = 30, placeholder }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleEmoji = (emojiData: EmojiClickData) => {
    onChange(value + emojiData.emoji);
  };

  return (
    <div className="space-y-2 relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        placeholder={placeholder}
        className="border px-2 py-1 rounded w-full"
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
