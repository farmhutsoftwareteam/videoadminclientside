import React, { useEffect, useState } from 'react';
import { getSubscribers } from '../functions/getUsers'; // Ensure this path is correct
import { Button } from "@/components/ui/button"; // Assuming you have a Button component in your design system

export default function Subscriptions() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const subscribersData = await getSubscribers();
        if (subscribersData) {
          // Sort users: paid users first, then free users
          const sortedSubscribers = subscribersData.sort((a, b) => {
            if (a.issubscribed && !b.issubscribed) return -1;
            if (!a.issubscribed && b.issubscribed) return 1;
            return 0;
          });
          setSubscribers(sortedSubscribers);
        } else {
          setSubscribers([]);
        }
      } catch (error) {
        setError("Failed to fetch subscribers");
        console.error("Error fetching subscribers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubscribers();
  }, []);

  return (
    <div className="p-4 md:p-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
        <h2 className="text-3xl font-bold text-red-600 dark:text-red-500 mb-4">Subscribers</h2>
        {loading ? (
          <div className="text-center text-gray-900 dark:text-gray-100">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : subscribers.length === 0 ? (
          <div className="text-center">
            <p className="text-lg text-gray-900 dark:text-gray-100">No subscribers found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <thead>
                <tr>
                  <th className="py-3 px-4 bg-gray-100 dark:bg-gray-700 text-left text-gray-900 dark:text-gray-100 font-medium">Name</th>
                  <th className="py-3 px-4 bg-gray-100 dark:bg-gray-700 text-left text-gray-900 dark:text-gray-100 font-medium">Email</th>
                  <th className="py-3 px-4 bg-gray-100 dark:bg-gray-700 text-left text-gray-900 dark:text-gray-100 font-medium">Status</th>
                  <th className="py-3 px-4 bg-gray-100 dark:bg-gray-700 text-left text-gray-900 dark:text-gray-100 font-medium">Subscribed On</th>
                  <th className="py-3 px-4 bg-gray-100 dark:bg-gray-700 text-left text-gray-900 dark:text-gray-100 font-medium">Payment Method</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map(sub => (
                  <tr key={sub.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                      {sub.full_name || 'N/A'}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                      {sub.email || 'N/A'}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                      {sub.issubscribed ? 'Paid Plan' : 'Free Plan'}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                      {sub.subscribedOn ? new Date(sub.subscribedOn).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                      {sub.payment_method || 'N/A'}
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
