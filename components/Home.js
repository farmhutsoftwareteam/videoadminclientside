import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { UsersIcon, LayoutGridIcon, ListIcon, DollarSignIcon } from "@/components/ui/icons";

// Dummy data for illustration
const stats = [
  { label: "Users", value: "12.3K", icon: UsersIcon },
  { label: "Shows", value: "345", icon: LayoutGridIcon },
  { label: "Categories", value: "78", icon: ListIcon },
  { label: "Revenue", value: "$12.3K", icon: DollarSignIcon }
];

const trendingVideos = [
  {
    title: "Trending Video",
    views: "1.4K",
    duration: "12:34",
    thumbnail: "/placeholder.svg",
  },
  {
    title: "Trending Video",
    views: "3.4K",
    duration: "8:45",
    thumbnail: "/placeholder.svg",
  },
  {
    title: "Trending Video",
    views: "7.8K",
    duration: "20:01",
    thumbnail: "/placeholder.svg",
  },
  {
    title: "Trending Video",
    views: "2.9K",
    duration: "15:22",
    thumbnail: "/placeholder.svg",
  },
];

const recommendedVideos = [
  {
    title: "Recommended Video",
    views: "4.6K",
    duration: "9:45",
    thumbnail: "/placeholder.svg",
  },
  {
    title: "Recommended Video",
    views: "2.1K",
    duration: "12:34",
    thumbnail: "/placeholder.svg",
  },
  {
    title: "Recommended Video",
    views: "3.7K",
    duration: "18:30",
    thumbnail: "/placeholder.svg",
  },
  {
    title: "Recommended Video",
    views: "2.5K",
    duration: "15:22",
    thumbnail: "/placeholder.svg",
  },
];

const Home = () => {

  const renderStats = () => {
    return stats.map((stat, index) => (
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
