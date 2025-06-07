import { useState } from 'react';
import {
  generateProfile,
  GenerateProfileParams,
  GeneratedProfile,
} from '../services/ai';

export function useGenerateProfile() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<GeneratedProfile | null>(null);
  const [error, setError] = useState<unknown>(null);

  const run = async (params: GenerateProfileParams) => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateProfile(params);
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, run };
}
