import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getShows } from '../functions/getShows'; // Ensure this path is correct
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button"; // Assuming these components are part of your design system
import { Input } from "@/components/ui/input";

const Shows = () => {
  const [shows, setShows] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const showsPerPage = 7;

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
    <div className="p-4 md:p-8">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg">
        <h2 className="text-3xl font-bold text-red-600 dark:text-red-500 mb-4">Shows</h2>
        <Input
          type="text"
          className="mb-4 p-2 w-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded-lg border border-gray-300 dark:border-gray-600"
          placeholder="Search by show title..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-100 dark:bg-gray-800 text-red-600 dark:text-red-500 border-b border-gray-300 dark:border-gray-600"></th>
              <th className="py-2 px-4 bg-gray-100 dark:bg-gray-800 text-red-600 dark:text-red-500 border-b border-gray-300 dark:border-gray-600">Title</th>
              <th className="py-2 px-4 bg-gray-100 dark:bg-gray-800 text-red-600 dark:text-red-500 border-b border-gray-300 dark:border-gray-600">Description</th>
              <th className="py-2 px-4 bg-gray-100 dark:bg-gray-800 text-red-600 dark:text-red-500 border-b border-gray-300 dark:border-gray-600">Category</th>
              <th className="py-2 px-4 bg-gray-100 dark:bg-gray-800 text-red-600 dark:text-red-500 border-b border-gray-300 dark:border-gray-600">Free</th>
            </tr>
          </thead>
          <tbody>
            {currentShows.map(show => (
              <tr key={show.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="py-2 px-4 text-black dark:text-white border-b border-gray-300 dark:border-gray-600">
                  <Link href={`/shows/${show.id}`}>
                    <img src={show.thumbnail} alt={show.title} className="w-15 h-8 rounded-lg" />
                  </Link>
                </td>
                <td className="py-2 px-4 text-black dark:text-white border-b border-gray-300 dark:border-gray-600">
                  <Link href={`/shows/${show.id}`} className="hover:underline">
                    {show.title}
                  </Link>
                </td>
                <td className="py-2 px-4 text-black dark:text-white border-b border-gray-300 dark:border-gray-600">{show.description}</td>
                <td className="py-2 px-4 text-black dark:text-white border-b border-gray-300 dark:border-gray-600">{show.category}</td>
                <td className="py-2 px-4 text-black dark:text-white border-b border-gray-300 dark:border-gray-600">{show.free ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <Button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 bg-red-500 text-white rounded flex items-center disabled:opacity-50"
          >
            <ChevronLeft size={16} />
            Previous
          </Button>
          <span className="text-black dark:text-white">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 bg-red-500 text-white rounded flex items-center disabled:opacity-50"
          >
            Next
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Shows;
