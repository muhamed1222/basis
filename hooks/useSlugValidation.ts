import { useEffect, useState } from 'react';
import { checkSlugUnique } from '../services/slugService';

export function useSlugValidation(slug: string, reserved: string[] = []) {
  const [valid, setValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (!slug) {
      setValid(null);
      return;
    }
    if (!/^[a-zA-Z0-9-_]{3,20}$/.test(slug) || reserved.includes(slug)) {
      setValid(false);
      return;
    }
    let cancelled = false;
    checkSlugUnique(slug)
      .then(r => {
        if (!cancelled) setValid(r.unique);
      })
      .catch(() => {
        if (!cancelled) setValid(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug, reserved]);

  return valid;
}
