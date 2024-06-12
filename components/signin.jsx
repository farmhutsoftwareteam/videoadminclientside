
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function signin() {
  return (
    (<div
      className="flex min-h-[100dvh] items-center justify-center bg-gray-100 dark:bg-gray-950">
      <div
        className="mx-auto w-full max-w-md rounded-xl bg-white p-6 shadow-lg dark:bg-gray-900">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-2">
            <FilmIcon className="h-8 w-8 text-red-500" />
            <span className="text-2xl font-bold text-red-500">hstv</span>
          </div>
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-gray-500 dark:text-gray-400">Join the best video streaming platform.</p>
          </div>
          <form className="w-full space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                className="mt-1"
                id="email"
                placeholder="m@example.com"
                required
                type="email" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                className="mt-1"
                id="password"
                placeholder="••••••••"
                required
                type="password" />
            </div>
            <Button className="w-full" type="submit">
              Sign Up
            </Button>
          </form>
        </div>
      </div>
    </div>)
  );
}

function FilmIcon(props) {
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
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M7 3v18" />
      <path d="M3 7.5h4" />
      <path d="M3 12h18" />
      <path d="M3 16.5h4" />
      <path d="M17 3v18" />
      <path d="M17 7.5h4" />
      <path d="M17 16.5h4" />
    </svg>)
  );
}
