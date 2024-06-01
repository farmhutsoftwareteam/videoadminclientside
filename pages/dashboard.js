import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout';
import { Users, Film, DollarSign } from 'lucide-react';
import { getShowCount } from '@/functions/getShows';
import { getUserCount } from '@/functions/getUsers';

const Dashboard = () => {
  const [showCount, setShowCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPayments, setFilteredPayments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const count = await getShowCount();
      const usersData = await getUserCount();

      setShowCount(count);
      setUserCount(usersData);
    };
    fetchData();
  }, []);

  const [stats, setStats] = useState({
    revenue: 0,
    recentPayments: [],
  });

  useEffect(() => {
    const payments = [
      { id: 1, customer: 'John Doe', amount: '$50', paymentMethod: 'Ecocash', date: '2024-05-01' },
      { id: 2, customer: 'Jane Smith', amount: '$75', paymentMethod: 'Innbucks', date: '2024-05-02' },
      // Add more recent payments Innbucks
    ];

    setStats({
      revenue: 5000,
      recentPayments: payments,
    });

    setFilteredPayments(payments);
  }, []);

  useEffect(() => {
    const filtered = stats.recentPayments.filter(payment =>
      payment.customer.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPayments(filtered);
  }, [searchQuery, stats.recentPayments]);

  return (
    <Layout>
      <div className="p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg flex items-center h-32 w-full">
            <Film className="text-blue-500 dark:text-blue-400 mr-4" size={40} aria-hidden="true" />
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{showCount}</h3>
              <p className="text-gray-600 dark:text-gray-400">Shows</p>
            </div>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg flex items-center h-32 w-full">
            <Users className="text-blue-500 dark:text-blue-400 mr-4" size={40} aria-hidden="true" />
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{userCount}</h3>
              <p className="text-gray-600 dark:text-gray-400">Users</p>
            </div>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg flex items-center h-32 w-full">
            <DollarSign className="text-blue-500 dark:text-blue-400 mr-4" size={40} aria-hidden="true" />
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">${stats.revenue}</h3>
              <p className="text-gray-600 dark:text-gray-400">Revenue</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Recent Payments</h2>
          <input
            type="text"
            className="mb-4 p-2 w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded"
            placeholder="Search by customer name..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">Customer</th>
                <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">Amount</th>
                <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">Payment Method</th>
                <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map(payment => (
                <tr key={payment.id}>
                  <td className="py-2 px-4 text-gray-900 dark:text-gray-100">{payment.customer}</td>
                  <td className="py-2 px-4 text-gray-900 dark:text-gray-100">{payment.amount}</td>
                  <td className="py-2 px-4 text-gray-900 dark:text-gray-100">{payment.paymentMethod}</td>
                  <td className="py-2 px-4 text-gray-900 dark:text-gray-100">{payment.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
