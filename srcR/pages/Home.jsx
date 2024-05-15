import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/AxiosInstance";

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        try {
          const response = await axiosInstance.get("/auth/users/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log(response);
          setIsAuthenticated(true);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    } else {
      setIsAuthenticated(false);
    }
  }, []);
  console.log(token);
  return (
    <>
      <h1>Home</h1>
    </>
  );
}

export default Home;
