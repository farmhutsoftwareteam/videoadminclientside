import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/layout';
import { getShows } from '@/functions/getShows'; // Assuming you have a function to fetch shows
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ShowsPage = () => {
  const [shows, setShows] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showsPerPage] = useState(7);

  useEffect(() => {
    const fetchData = async () => {
      const showsData = await getShows();
      setShows(showsData);
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page on search
  };

  const filteredShows = shows.filter(show =>
    show.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastShow = currentPage * showsPerPage;
  const indexOfFirstShow = indexOfLastShow - showsPerPage;
  const currentShows = filteredShows.slice(indexOfFirstShow, indexOfLastShow);
  const totalPages = Math.ceil(filteredShows.length / showsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Layout>
      <div className="p-4 md:p-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Shows</h2>
          <input
            type="text"
            className="mb-4 p-2 w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded"
            placeholder="Search by show title..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"></th>
                <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">Title</th>
                <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">Description</th>
                <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">Category</th>
                <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">Free</th>
              </tr>
            </thead>
            <tbody>
              {currentShows.map(show => (
                <tr key={show.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                  <td className="py-2 px-4 text-gray-900 dark:text-gray-100">
                    <Link href={`/shows/${show.id}`}>
                     
                        <img src={show.thumbnail} alt={show.title} className="w-16 h-16 rounded"/>
                      
                    </Link>
                  </td>
                  <td className="py-2 px-4 text-gray-900 dark:text-gray-100">
                    <Link href={`/shows/${show.id}`}>
                      {show.title}
                    </Link>
                  </td>
                  <td className="py-2 px-4 text-gray-900 dark:text-gray-100">{show.description}</td>
                  <td className="py-2 px-4 text-gray-900 dark:text-gray-100">{show.category}</td>
                  <td className="py-2 px-4 text-gray-900 dark:text-gray-100">{show.free ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded flex items-center"
            >
              <ChevronLeft size={16} />
              Previous
            </button>
            <span className="text-gray-900 dark:text-gray-100">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded flex items-center"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShowsPage;
