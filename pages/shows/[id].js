import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout';
import { getShowById, updateShow, getEpisodesByShowId } from '@/functions/getShows'; // Assuming you have functions to get and update a show, and to fetch episodes
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ShowDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [show, setShow] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [episodesPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');

  useEffect(() => {
    const fetchShow = async () => {
      if (id) {
        const showData = await getShowById(id);
        setShow(showData);
        setLoading(false);
      }
    };
    const fetchEpisodes = async () => {
      if (id) {
        const episodesData = await getEpisodesByShowId(id);
        setEpisodes(episodesData);
      }
    };
    fetchShow();
    fetchEpisodes();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShow({ ...show, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    await updateShow(id, show);
    setUpdating(false);
    setUpdateMessage('Show updated successfully!');
    setTimeout(() => setUpdateMessage(''), 3000);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page on search
  };

  const filteredEpisodes = episodes.filter(episode =>
    episode.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastEpisode = currentPage * episodesPerPage;
  const indexOfFirstEpisode = indexOfLastEpisode - episodesPerPage;
  const currentEpisodes = filteredEpisodes.slice(indexOfFirstEpisode, indexOfLastEpisode);
  const totalPages = Math.ceil(filteredEpisodes.length / episodesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="p-4 md:p-8">
        {updateMessage && (
          <div className="mb-4 p-2 bg-green-500 text-white rounded">
            {updateMessage}
          </div>
        )}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Edit Show</h2>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 mb-4 md:mb-0">
              <img src={show.thumbnail} alt={show.title} className="rounded" />
            </div>
            <div className="md:w-2/3 md:ml-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-900 dark:text-gray-100 mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={show.title}
                    onChange={handleInputChange}
                    className="p-2 w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-900 dark:text-gray-100 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={show.description}
                    onChange={handleInputChange}
                    className="p-2 w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-900 dark:text-gray-100 mb-1">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={show.category}
                    onChange={handleInputChange}
                    className="p-2 w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-900 dark:text-gray-100 mb-1">Free</label>
                  <select
                    name="isfree"
                    value={show.isfree}
                    onChange={handleInputChange}
                    className="p-2 w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded"
                  >
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className={`p-2 ${updating ? 'bg-gray-500' : 'bg-blue-500'} text-white rounded`}
                  disabled={updating}
                >
                  {updating ? 'Loading...' : 'Save'}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Episodes</h2>
          <input
            type="text"
            className="mb-4 p-2 w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded"
            placeholder="Search by episode title..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">Thumbnail</th>
                  <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">Title</th>
                  <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">Description</th>
                  <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">Season</th>
                  <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">Episode</th>
                  <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">Duration</th>
                </tr>
              </thead>
              <tbody>
                {currentEpisodes.map(episode => (
                  <tr key={episode.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    <td className="py-2 px-4 text-gray-900 dark:text-gray-100">
                      <img src={episode.thumbnail} alt={episode.title} className="w-16 h-16 rounded" />
                    </td>
                    <td className="py-2 px-4 text-gray-900 dark:text-gray-100 truncate">{episode.title}</td>
                    <td className="py-2 px-4 text-gray-900 dark:text-gray-100 truncate">{episode.description}</td>
                    <td className="py-2 px-4 text-gray-900 dark:text-gray-100">{episode.season}</td>
                    <td className="py-2 px-4 text-gray-900 dark:text-gray-100">{episode.episode}</td>
                    <td className="py-2 px-4 text-gray-900 dark:text-gray-100">{episode.duration} min</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

export default ShowDetailPage;
