import supabase from '../lib/supabase';

export async function createCategory(categoryDetails) {
  const { data, error } = await supabase.from('categories').insert([
    {
      name: categoryDetails.name,
      description: categoryDetails.description,
    },
  ]);

  if (error) {
    throw error;
  }

  return data;
}
