import React, { useState, useEffect } from 'react';
import { getPlans, updatePlan, deletePlan } from '../functions/getPlans'; // Ensure this path is correct
import { Button } from "@/components/ui/button"; // Assuming you have a Button component in your design system

export default function AdminSubscribers() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const plansData = await getPlans();
        setPlans(plansData);
      } catch (error) {
        setError("Failed to fetch plans");
        console.error("Error fetching plans:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const handleUpdatePlan = async (planId) => {
    // Assuming updatedData is gathered from a form or some input field
    const updatedData = {
      // Example: you may want to get these values from a form
      name: "Updated Plan Name",
      amount: 20
    };
    try {
      const updatedPlan = await updatePlan(planId, updatedData);
      if (updatedPlan) {
        setPlans(plans.map(plan => (plan.id === planId ? updatedPlan : plan)));
      }
    } catch (error) {
      console.error("Error updating plan:", error);
      setError("Failed to update plan");
    }
  };

  const handleDeletePlan = async (planId) => {
    try {
      const deletedPlan = await deletePlan(planId);
      if (deletedPlan) {
        setPlans(plans.filter(plan => plan.id !== planId));
      }
    } catch (error) {
      console.error("Error deleting plan:", error);
      setError("Failed to delete plan");
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
        <h2 className="text-3xl font-bold text-red-600 dark:text-red-500 mb-4">Subscribers</h2>
        {loading ? (
          <div className="text-center text-gray-900 dark:text-gray-100">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : plans.length === 0 ? (
          <div className="text-center">
            <p className="text-lg text-gray-900 dark:text-gray-100">No subscribers found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <thead>
                <tr>
                  <th className="py-3 px-4 bg-gray-100 dark:bg-gray-700 text-left text-gray-900 dark:text-gray-100 font-medium">Name</th>
                  <th className="py-3 px-4 bg-gray-100 dark:bg-gray-700 text-left text-gray-900 dark:text-gray-100 font-medium">Amount</th>
                  <th className="py-3 px-4 bg-gray-100 dark:bg-gray-700 text-left text-gray-900 dark:text-gray-100 font-medium">Status</th>
                  <th className="py-3 px-4 bg-gray-100 dark:bg-gray-700 text-left text-gray-900 dark:text-gray-100 font-medium">Subscribed On</th>
                  <th className="py-3 px-4 bg-gray-100 dark:bg-gray-700 text-left text-gray-900 dark:text-gray-100 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {plans.map(plan => (
                  <tr key={plan.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                      {plan.name}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                      {plan.amount}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                      Active
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                      {new Date().toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUpdatePlan(plan.id)}
                        className="text-blue-600 dark:text-blue-400"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeletePlan(plan.id)}
                        className="text-red-600 dark:text-red-400"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
