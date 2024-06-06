import supabase from '../lib/supabase';

export async function getPlans() {
  const { data, error } = await supabase
    .from('plans')
    .select('*');

  if (error) {
    console.error('Error fetching plans:', error);
    return [];
  }

  return data;
}

export async function updatePlan(planId, updatedData) {
  const { data, error } = await supabase
    .from('plans')
    .update(updatedData)
    .eq('id', planId);

  if (error) {
    console.error(`Error updating plan with ID ${planId}:`, error);
    return null;
  }

  return data;
}

export async function deletePlan(planId) {
  const { data, error } = await supabase
    .from('plans')
    .delete()
    .eq('id', planId);

  if (error) {
    console.error(`Error deleting plan with ID ${planId}:`, error);
    return null;
  }

  return data;
}
