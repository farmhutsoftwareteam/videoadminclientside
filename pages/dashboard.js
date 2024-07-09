import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'; // Import useRouter for navigation
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import {
  BellIcon,
  DollarSignIcon,
  HomeIcon,
  LayoutGridIcon,
  ListIcon,
  SearchIcon,
  SettingsIcon,
  TrendingUpIcon,
  UsersIcon,
  VideoIcon,
} from "@/components/ui/icons";
import NavigationItem from "@/components/NavigationItem";
import Home from "@/components/Home";
import MyVideos from "@/components/MyVideos";
import Subscriptions from "@/components/Subscriptions";
import Shows from "@/components/Shows";
import Categories from "@/components/categories";
import Settings from "@/components/Settings";

export function Dashboard() {
  const [activeSection, setActiveSection] = useState("home");
  const router = useRouter(); // Initialize router

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/signin");
  };

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return <Home />;
      // case "trending":
      //   return <Home/>;
      case "my-videos":
        return <MyVideos />;
      case "subscriptions":
        return <Subscriptions />;
      case "shows":
        return <Shows />;
      case "categories":
        return <Categories />;
      // case "settings":
      //   return <Settings />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="grid min-h-screen w-full grid-cols-[280px_1fr] bg-white dark:bg-gray-950">
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link className="flex items-center gap-2 font-semibold text-red-500" href="#">
              <VideoIcon className="h-6 w-6" />
              <span className="">hstv</span>
            </Link>
            <Button className="ml-auto h-8 w-8" size="icon" variant="outline">

              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <NavigationItem
                icon={HomeIcon}
                label="Home"
                onClick={() => setActiveSection("home")}
                isActive={activeSection === "home"}
              />
              {/* <NavigationItem
                icon={TrendingUpIcon}
                label="Trending"
                onClick={() => setActiveSection("trending")}
                isActive={activeSection === "trending"}
              /> */}
              <NavigationItem
                icon={VideoIcon}
                label="My Videos"
                onClick={() => setActiveSection("my-videos")}
                isActive={activeSection === "my-videos"}
              />
              <NavigationItem
                icon={UsersIcon}
                label="Subscriptions"
                onClick={() => setActiveSection("subscriptions")}
                isActive={activeSection === "subscriptions"}
              />
              <NavigationItem
                icon={LayoutGridIcon}
                label="Shows"
                onClick={() => setActiveSection("shows")}
                isActive={activeSection === "shows"}
              />
              <NavigationItem
                icon={ListIcon}
                label="Categories"
                onClick={() => setActiveSection("categories")}
                isActive={activeSection === "categories"}
              />
              {/* <NavigationItem
                icon={SettingsIcon}
                label="Settings"
                onClick={() => setActiveSection("settings")}
                isActive={activeSection === "settings"}
              /> */}
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Button className="w-full" variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <Link className="lg:hidden" href="#">
            <VideoIcon className="h-6 w-6 text-red-500" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
                  placeholder="Search videos..."
                  type="search"
                />
              </div>
            </form>
          </div>
          <Button 
            className="hidden lg:inline-flex bg-red-500 text-white" 
            variant="outline" 
            onClick={() => router.push('/upload')}
          >
            Create Video
          </Button>
          <Button 
            className="hidden lg:inline-flex text-red-500" 
            variant="outline" 
            onClick={() => router.push('/show')}
          >
            Create Show
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800" size="icon" variant="ghost">
                <img
                  alt="Avatar"
                  className="rounded-full"
                  height="32"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "32/32",
                    objectFit: "cover",
                  }}
                  width="32"
                />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        {renderSection()} {/* Render the active section */}
      </div>
    </div>
  );
}

export default Dashboard;
