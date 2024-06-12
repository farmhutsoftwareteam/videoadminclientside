import supabase from '../lib/supabase';

export async function getUsers() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*');

  if (error) {
    console.error('Error fetching users:', error);
    return [];
  }

  return data;
}

export async function getUserCount() {
  const { count, error } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error('Error fetching user count:', error);
    return 0;
  }

  return count;
}

export async function getUserById(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    return null;
  }

  return data;
}

export async function getSubscribers() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('issubscribed', 'TRUE')

  if (error) {
    console.error(`Error fetching subscribers:`, error);
    return null;
  }

  return data;
}
