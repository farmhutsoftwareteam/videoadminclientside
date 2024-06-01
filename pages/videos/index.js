import React, { useEffect, useState } from 'react';
import { getEpisodes } from '@/functions/getVideos';
import Layout from '@/components/layout';
import { Eye, BarChart2 } from 'lucide-react';
import Link from 'next/link';

const Episodes = () => {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    async function fetchEpisodes() {
      const episodesData = await getEpisodes();
      setEpisodes(episodesData);
    }

    fetchEpisodes();
  }, []);

  return (
    <Layout>
      <div className="p-4 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {episodes.map(episode => (
            <div key={episode.id} className="border p-2 md:p-4 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <img src={episode.thumbnail} alt="Episode thumbnail" className="w-full h-auto rounded-t-lg" />
              <div className="p-2 md:p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{episode.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{episode.description}</p>
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs mt-2">
                  <BarChart2 size={16} className="mr-1" aria-hidden="true" />
                  {episode.duration} minutes
                </div>
                <Link legacyBehavior href={`/episodes/${episode.id}`}>
                  <a className="text-blue-500 dark:text-blue-400 hover:underline mt-4 flex items-center">
                    <Eye size={20} className="mr-1" aria-hidden="true" />
                    View Details
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Episodes;
