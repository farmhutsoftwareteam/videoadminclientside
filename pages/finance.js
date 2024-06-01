import React, { useState } from 'react';
import Layout from '@/components/layout';

const mockPlans = [
  { id: 1, name: 'Basic Plan', price: 10 },
  { id: 2, name: 'Standard Plan', price: 20 },
  { id: 3, name: 'Premium Plan', price: 30 },
];

const Finance = () => {
  const [plans, setPlans] = useState(mockPlans);
  const [isEditing, setIsEditing] = useState(null);
  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdatePlan = (planId) => {
    const updatedPlans = plans.map(plan =>
      plan.id === planId ? { ...plan, price: formData[planId] || plan.price } : plan
    );
    setPlans(updatedPlans);
    setIsEditing(null);
  };

  return (
    <Layout>
      <div className="p-4 md:p-8">
        <h2 className="text-2xl font-bold mb-4">Finance</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {plans.map(plan => (
            <div key={plan.id} className="border p-2 md:p-4 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <div className="p-2 md:p-4">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="text-gray-600">Price: ${plan.price}</p>
                {isEditing === plan.id ? (
                  <div>
                    <input
                      type="number"
                      name={plan.id}
                      value={formData[plan.id] || plan.price}
                      onChange={handleInputChange}
                      className="w-full mb-4 p-2 border rounded"
                    />
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
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditing(plan.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                  >
                    Edit Price
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Finance;