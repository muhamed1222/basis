import { useEffect, useState } from 'react';
import { saveData, loadData, deleteData } from '../services/cloud';

export function useAutosave<T>(userId: string, key: string, state: T) {
  const storageKey = `draft_${userId}_${key}`;
  const [saved, setSaved] = useState(true);

  // Save state to cloud/local storage with debounce
  useEffect(() => {
    setSaved(false);
    const handle = setTimeout(() => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(state));
        void saveData('drafts', storageKey, state);
        setSaved(true);
      } catch {
        setSaved(false);
      }
    }, 500);
    return () => clearTimeout(handle);
  }, [state, storageKey]);

  const loadDraft = (): T | undefined => {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      try {
        return JSON.parse(raw) as T;
      } catch {
        // fallthrough
      }
    }
    // try cloud
    let data: T | undefined;
    loadData<T>('drafts', storageKey).then(d => {
      if (d) {
        localStorage.setItem(storageKey, JSON.stringify(d));
      }
    });
    return data;
  };

  const clearDraft = () => {
    localStorage.removeItem(storageKey);
    void deleteData('drafts', storageKey);
  };

  return { saved, loadDraft, clearDraft };
}
