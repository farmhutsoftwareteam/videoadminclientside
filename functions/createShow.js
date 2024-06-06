import supabase from '../lib/supabase';

export async function createShow(showDetails) {
  const { data, error } = await supabase.from('shows').insert([
    {
      title: showDetails.title,
      category: showDetails.category,
      thumbnail: showDetails.thumbnail,
      description: showDetails.description,
      isfree: showDetails.isFree,
    },
  ]);

  if (error) {
    throw error;
  }

  return data;
}
