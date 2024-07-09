import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export const saveFileUrlToSupabase = async (table, data) => {
  try {
    const { data: result, error } = await supabase.from(table).insert(data);
    if (error) throw error;
    return result;
  } catch (error) {
    console.error('Supabase error:', error);
    throw error;
  }
};
