import { useState } from 'react';

interface History<T> {
  past: T[];
  present: T;
  future: T[];
}

export function useUndoRedo<T>(initialPresent: T) {
  const [history, setHistory] = useState<History<T>>({
    past: [],
    present: initialPresent,
    future: [],
  });

  const canUndo = history.past.length > 0;
  const canRedo = history.future.length > 0;

  const set = (newPresent: T) => {
    setHistory((h) => ({
      past: [...h.past, h.present].slice(-50),
      present: newPresent,
      future: [],
    }));
  };

  const undo = () => {
    setHistory((h) => {
      if (h.past.length === 0) return h;
      const past = h.past.slice();
      const previous = past.pop() as T;
      return {
        past,
        present: previous,
        future: [h.present, ...h.future].slice(0, 50),
      };
    });
  };

  const redo = () => {
    setHistory((h) => {
      if (h.future.length === 0) return h;
      const future = h.future.slice();
      const next = future.shift() as T;
      return {
        past: [...h.past, h.present].slice(-50),
        present: next,
        future,
      };
    });
  };

  return { state: history.present, set, undo, redo, canUndo, canRedo };
}
