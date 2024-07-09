import supabase from '../lib/supabase';

export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data;
}

export async function getCategoryCount() {
  const { count, error } = await supabase
    .from('categories')
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error('Error fetching category count:', error);
    return 0;
  }

  return count;
}

export async function getCategoryById(categoryId) {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', categoryId)
    .single();

  if (error) {
    console.error(`Error fetching category with ID ${categoryId}:`, error);
    return null;
  }

  return data;
}

export async function updateCategory(categoryId, updatedData) {
  console.log('Updating category with ID:', categoryId);
  console.log('Updated data being sent:', updatedData);

  const { data, error } = await supabase
    .from('categories')
    .update(updatedData)
    .eq('id', categoryId)
    .select(); // Ensure we select the updated data

  if (error) {
    console.error(`Error updating category with ID ${categoryId}:`, error);
    return null;
  }

  console.log('Updated category data received:', data); // Log the updated data
  return data;
}

export async function deleteCategory(categoryId) {
  const { data, error } = await supabase
    .from('categories')
    .delete()
    .eq('id', categoryId);

  if (error) {
    console.error(`Error deleting category with ID ${categoryId}:`, error);
    throw error;
  }

  return data;
}
