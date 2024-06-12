import React from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component in your UI library

const Logout = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('token'); // Remove the token from cookies
    router.push("/signin"); // Redirect to the login page or home page
  };

  return (
    <Button className="w-full" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;
