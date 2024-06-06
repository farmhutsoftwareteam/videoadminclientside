import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout';
import supabase from '../lib/supabase';

const NewPlan = () => {
  const [formData, setFormData] = useState({
    plan_name: '',
    plan_amount: '',
    integration_id: '',
    integration_key: ''
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreatePlan = async () => {
    setLoading(true);
    const { plan_name, plan_amount, integration_id, integration_key } = formData;
    const { data, error } = await supabase.from('plans').insert([{ plan_name, plan_amount, integration_id, integration_key }]);

    if (error) {
      console.error('Error creating plan:', error);
    } else {
      router.push('/finance'); // Redirect to finance page after creation
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="p-4 md:p-8">
        <h2 className="text-2xl font-bold mb-4">Create New Plan</h2>
        <div className="max-w-md mx-auto">
          <div className="mb-4">
            <label className="block text-gray-700">Plan Name</label>
            <input
              type="text"
              name="plan_name"
              value={formData.plan_name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Plan Amount</label>
            <input
              type="number"
              name="plan_amount"
              value={formData.plan_amount}
              onChange={handleInputChange}
              className="w-full p-2 border rounded text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Integration ID</label>
            <input
              type="text"
              name="integration_id"
              value={formData.integration_id}
              onChange={handleInputChange}
              className="w-full p-2 border rounded text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Integration Key</label>
            <input
              type="text"
              name="integration_key"
              value={formData.integration_key}
              onChange={handleInputChange}
              className="w-full p-2 border rounded text-black"
            />
          </div>
          <button
            onClick={handleCreatePlan}
            className={`bg-blue-500 text-white px-4 py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Plan'}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default NewPlan;
