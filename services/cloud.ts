import { createClient, SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | undefined;

export function getClient() {
  if (client) return client;
  const url = import.meta.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_KEY || process.env.SUPABASE_KEY;
  if (url && key) {
    client = createClient(url, key);
  }
  return client;
}

export async function saveData(table: string, id: string, data: unknown) {
  const supabase = getClient();
  if (supabase) {
    await supabase.from(table).upsert({ id, data }).throwOnError();
  } else {
    localStorage.setItem(`${table}_${id}`, JSON.stringify(data));
  }
}

export async function loadData<T>(table: string, id: string): Promise<T | undefined> {
  const supabase = getClient();
  if (supabase) {
    const { data, error } = await supabase
      .from(table)
      .select('data')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data?.data as T | undefined;
  } else {
    const raw = localStorage.getItem(`${table}_${id}`);
    return raw ? (JSON.parse(raw) as T) : undefined;
  }
}

export async function deleteData(table: string, id: string) {
  const supabase = getClient();
  if (supabase) {
    await supabase.from(table).delete().eq('id', id).throwOnError();
  } else {
    localStorage.removeItem(`${table}_${id}`);
  }
}
