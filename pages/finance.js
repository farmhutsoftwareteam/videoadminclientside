import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout';
import { getPlans, updatePlan, deletePlan } from '../functions/getPlans';
import { Edit, Trash } from 'lucide-react';

const Finance = () => {
  const [plans, setPlans] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [formData, setFormData] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchPlans = async () => {
      const plans = await getPlans();
      setPlans(plans);
    };
    fetchPlans();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdatePlan = async (planId) => {
    const updatedPlan = await updatePlan(planId, { plan_amount: formData[planId] || plans.find(plan => plan.id === planId).plan_amount });
    if (updatedPlan) {
      setPlans(plans.map(plan => (plan.id === planId ? updatedPlan : plan)));
      setIsEditing(null);
    }
  };

  const handleDeletePlan = async (planId) => {
    await deletePlan(planId);
    setPlans(plans.filter(plan => plan.id !== planId));
  };

  return (
    <Layout>
      <div className="p-4 md:p-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Finance</h2>
          {plans.length === 0 ? (
            <div className="text-center">
              <p className="text-lg text-gray-900 dark:text-gray-100">No plans exist.</p>
              <button
                onClick={() => router.push('/new-plan')}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              >
                Please make a new plan
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <thead>
                  <tr>
                    <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">Plan Name</th>
                    <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">Plan Amount</th>
                    <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">Integration ID</th>
                    <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">Integration Key</th>
                    <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map(plan => (
                    <tr key={plan.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                        {plan.plan_name}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                        {isEditing === plan.id ? (
                          <input
                            type="number"
                            name={plan.id}
                            value={formData[plan.id] || plan.plan_amount}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded text-black"
                          />
                        ) : (
                          `$${plan.plan_amount}`
                        )}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                        {plan.integration_id}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                        {plan.integration_key}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 flex space-x-2">
                        {isEditing === plan.id ? (
                          <>
                            <button
                              onClick={() => handleUpdatePlan(plan.id)}
                              className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setIsEditing(null)}
                              className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => setIsEditing(plan.id)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDeletePlan(plan.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash className="w-5 h-5" />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Finance;
