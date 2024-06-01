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

export async function getShowById(showId) {
  const { data, error } = await supabase
    .from('shows')
    .select('*')
    .eq('id', showId)
    .single();

  if (error) {
    console.error(`Error fetching show with ID ${showId}:`, error);
    return null;
  }

  return data;
}

export async function getEpisodesByShowId(showId) {
  const { data, error } = await supabase
    .from('episodes')
    .select('*')
    .eq('show', showId);

  if (error) {
    console.error(`Error fetching episodes for show with ID ${showId}:`, error);
    return [];
  }

  return data;
}

export async function updateShow(showId, updatedData) {
    console.log('Updating show with ID:', showId);
    console.log('Updated data being sent:', updatedData);
  
    const { data, error } = await supabase
      .from('shows')
      .update(updatedData)
      .eq('id', showId)
      .select(); // Ensure we select the updated data
  
    if (error) {
      console.error(`Error updating show with ID ${showId}:`, error);
      return null;
    }
  
    console.log('Updated show data received:', data); // Log the updated data
    return data;
  }

  