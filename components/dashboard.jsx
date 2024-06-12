import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
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
import { Card, CardContent } from "@/components/ui/card";

export function Dashboard() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token"); // Remove the token from cookies
    router.push("/signin"); // Redirect to the login page
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
              <Link
                className="flex items-center gap-3 rounded-lg bg-red-500 px-3 py-2 text-white transition-all hover:text-white dark:bg-red-500 dark:text-white"
                href="#"
              >
                <HomeIcon className="h-4 w-4" />
                Home
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-red-500 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <TrendingUpIcon className="h-4 w-4" />
                Trending
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-red-500 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <VideoIcon className="h-4 w-4" />
                My Videos
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-red-500 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <UsersIcon className="h-4 w-4" />
                Subscriptions
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-red-500 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <LayoutGridIcon className="h-4 w-4" />
                Shows
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-red-500 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <ListIcon className="h-4 w-4" />
                Categories
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-red-500 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <SettingsIcon className="h-4 w-4" />
                Settings
              </Link>
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
          <Button className="hidden lg:inline-flex" variant="outline">
            Upload Video
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
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">12.3K</h3>
                  <p className="text-gray-500 dark:text-gray-400">Users</p>
                </div>
                <UsersIcon className="h-8 w-8 text-red-500" />
              </div>
            </Card>
            <Card className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">345</h3>
                  <p className="text-gray-500 dark:text-gray-400">Shows</p>
                </div>
                <LayoutGridIcon className="h-8 w-8 text-red-500" />
              </div>
            </Card>
            <Card className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">78</h3>
                  <p className="text-gray-500 dark:text-gray-400">Categories</p>
                </div>
                <ListIcon className="h-8 w-8 text-red-500" />
              </div>
            </Card>
            <Card className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">$12.3K</h3>
                  <p className="text-gray-500 dark:text-gray-400">Revenue</p>
                </div>
                <DollarSignIcon className="h-8 w-8 text-red-500" />
              </div>
            </Card>
          </div>
          <section className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Trending Now</h2>
              <Link className="text-red-500 hover:underline" href="#">
                See More
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
              <Card>
                <img
                  alt="Video thumbnail"
                  className="aspect-video rounded-t-lg object-cover"
                  height="360"
                  src="/placeholder.svg"
                  width="640"
                />
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Trending Video</h3>
                    <div className="text-sm text-gray-500 dark:text-gray-400">12:34</div>
                  </div>
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">1.2K views</div>
                </CardContent>
              </Card>
              <Card>
                <img
                  alt="Video thumbnail"
                  className="aspect-video rounded-t-lg object-cover"
                  height="360"
                  src="/placeholder.svg"
                  width="640"
                />
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Trending Video</h3>
                    <div className="text-sm text-gray-500 dark:text-gray-400">8:45</div>
                  </div>
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">3.4K views</div>
                </CardContent>
              </Card>
              <Card>
                <img
                  alt="Video thumbnail"
                  className="aspect-video rounded-t-lg object-cover"
                  height="360"
                  src="/placeholder.svg"
                  width="640"
                />
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Trending Video</h3>
                    <div className="text-sm text-gray-500 dark:text-gray-400">20:01</div>
                  </div>
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">7.8K views</div>
                </CardContent>
              </Card>
              <Card>
                <img
                  alt="Video thumbnail"
                  className="aspect-video rounded-t-lg object-cover"
                  height="360"
                  src="/placeholder.svg"
                  width="640"
                />
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Trending Video</h3>
                    <div className="text-sm text-gray-500 dark:text-gray-400">15:22</div>
                  </div>
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">2.9K views</div>
                </CardContent>
              </Card>
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
              <Card>
                <img
                  alt="Video thumbnail"
                  className="aspect-video rounded-t-lg object-cover"
                  height="360"
                  src="/placeholder.svg"
                  width="640"
                />
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Recommended Video</h3>
                    <div className="text-sm text-gray-500 dark:text-gray-400">9:45</div>
                  </div>
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">4.6K views</div>
                </CardContent>
              </Card>
              <Card>
                <img
                  alt="Video thumbnail"
                  className="aspect-video rounded-t-lg object-cover"
                  height="360"
                  src="/placeholder.svg"
                  width="640"
                />
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Recommended Video</h3>
                    <div className="text-sm text-gray-500 dark:text-gray-400">12:34</div>
                  </div>
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">2.1K views</div>
                </CardContent>
              </Card>
              <Card>
                <img
                  alt="Video thumbnail"
                  className="aspect-video rounded-t-lg object-cover"
                  height="360"
                  src="/placeholder.svg"
                  width="640"
                />
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Recommended Video</h3>
                    <div className="text-sm text-gray-500 dark:text-gray-400">18:30</div>
                  </div>
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">3.7K views</div>
                </CardContent>
              </Card>
              <Card>
                <img
                  alt="Video thumbnail"
                  className="aspect-video rounded-t-lg object-cover"
                  height="360"
                  src="/placeholder.svg"
                  width="640"
                />
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Recommended Video</h3>
                    <div className="text-sm text-gray-500 dark:text-gray-400">15:22</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function BellIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>)
  );
}


function DollarSignIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>)
  );
}


function HomeIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>)
  );
}


function LayoutGridIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>)
  );
}


function ListIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <line x1="8" x2="21" y1="6" y2="6" />
      <line x1="8" x2="21" y1="12" y2="12" />
      <line x1="8" x2="21" y1="18" y2="18" />
      <line x1="3" x2="3.01" y1="6" y2="6" />
      <line x1="3" x2="3.01" y1="12" y2="12" />
      <line x1="3" x2="3.01" y1="18" y2="18" />
    </svg>)
  );
}


function SearchIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>)
  );
}


function SettingsIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path
        d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>)
  );
}


function TrendingUpIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>)
  );
}


function UsersIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>)
  );
}


function VideoIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path
        d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </svg>)
  );
}
