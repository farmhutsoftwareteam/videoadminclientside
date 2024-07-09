import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { UsersIcon, LayoutGridIcon, ListIcon, DollarSignIcon } from "@/components/ui/icons";
import { getUsers } from "@/functions/getUsers";
import { getShowCount } from "@/functions/getShows";
import { getSubscribers } from "@/functions/getUsers";
import { getVideos } from "@/functions/getVideos";


const Home = () => {
  const [userCount, setUserCount] = useState(0);
  const [showCount, setShowCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [trendingVideos, setTrendingVideos] = useState([]);
  const [recommendedVideos, setRecommendedVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const [users, shows, categories, revenueData, trending, recommended] = await Promise.all([
          getUsers(),
          getShowCount(),
          getSubscribers(),
          getVideos(),
          getVideos(),
          getRecommendedVideos(),
        ]);

        console.log('Fetched users:', users);
        console.log('Fetched shows count:', shows);
        console.log('Fetched categories:', categories);
        console.log('Fetched revenue data:', revenueData);
        console.log('Fetched trending videos:', trending);
        console.log('Fetched recommended videos:', recommended);

        setUserCount(users.length || 0);
        setShowCount(shows || 0);
        setCategoryCount(categories.length || 0);
        setRevenue(revenueData.length || 0);
        setTrendingVideos(trending || []);
        setRecommendedVideos(recommended || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  const renderStats = () => {
    return [
      { label: "Users", value: userCount, icon: UsersIcon },
      { label: "Shows", value: showCount, icon: LayoutGridIcon },
      { label: "Categories", value: categoryCount, icon: ListIcon },
      { label: "Revenue", value: `$${revenue}`, icon: DollarSignIcon }
    ].map((stat, index) => (
      <Card key={index} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold">{stat.value}</h3>
            <p className="text-gray-500 dark:text-gray-400">{stat.label}</p>
          </div>
          <stat.icon className="h-8 w-8 text-red-500" />
        </div>
      </Card>
    ));
  };

  const renderVideoCards = (videos) => {
    return videos.map((video, index) => (
      <Card key={index}>
        <img
          alt="Video thumbnail"
          className="aspect-video rounded-t-lg object-cover"
          height="360"
          src={video.thumbnail}
          width="640"
        />
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">{video.title}</h3>
            <div className="text-sm text-gray-500 dark:text-gray-400">{video.duration}</div>
          </div>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">{video.views} views</div>
        </CardContent>
      </Card>
    ));
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {renderStats()}
      </div>
      <section className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Trending Now</h2>
          <Link className="text-red-500 hover:underline" href="#">
            See More
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {renderVideoCards(trendingVideos)}
        </div>
      </section>
      <section className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Recommended for You</h2>
          <Link className="text-red-500 hover:underline" href="#">
            See More
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {renderVideoCards(recommendedVideos)}
        </div>
      </section>
    </main>
  );
};

export default Home;
