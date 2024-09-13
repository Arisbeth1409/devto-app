import { useState, useEffect } from "react";
import { getUser } from "@/utils/api";

export function useUser(id) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const id = localStorage.getItem("user");

    if (!id) return;
    getUser(id)
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return { user };
}

export function useIsLoggedIn() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return { isLoggedIn };
}
