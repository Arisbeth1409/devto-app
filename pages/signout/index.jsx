import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import MainLayout from "@/Layouts/MainLayout";

export default function SignOut() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  function handleLoginLogout() {
    if (isLoggedIn) {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      router.push("/login");
    }

    if (!isLoggedIn) {
      router.push("/login");
    }
  }

  return (
    <MainLayout>
      <main className="mt-[20%] mb-12 max-w-[544px] p-4 sm:p-[0px] flex justify-center  flex-col items-center mx-auto pt-9">
        <h1 className="bold text-[25px]">Are you sure you want to sign out?</h1>
        <button
          onClick={handleLoginLogout}
          className="h-[48px] pl-[12px] pr-[12px] bg-[#3b49df] mt-3 text-white hover:bg-[#2f3ab2] rounded-[5px] text-[18px]"
        >
          Yes, sign out
        </button>
      </main>
    </MainLayout>
  );
}
