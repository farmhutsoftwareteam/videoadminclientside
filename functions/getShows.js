import supabase from '../lib/supabase';

export async function getShows() {
  const { data, error } = await supabase
    .from('shows')
    .select('*');

  if (error) {
    console.error('Error fetching shows:', error);
    return [];
  }

  return data;
}

export async function getShowCount() {
    const { count, error } = await supabase
      .from('shows')
      .select('*', { count: 'exact', head: true });
  
    if (error) {
      console.error('Error fetching show count:', error);
      return 0;
    }
  
    return count;
  }
