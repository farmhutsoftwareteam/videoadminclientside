import supabase from '../lib/supabase';

export async function getEpisodes() {
  const { data, error } = await supabase
    .from('episodes')
    .select('*');

  if (error) {
    console.error('Error fetching episodes:', error);
    return [];
  }

  return data;
}