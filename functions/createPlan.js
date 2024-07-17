import supabase from '../lib/supabase';

export const createPlan = async (planData) => {
    try {
        const response = await fetch('/api/plans', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(planData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return { data };
    } catch (error) {
        console.error("Error creating plan:", error);
        return { error };
    }
};
