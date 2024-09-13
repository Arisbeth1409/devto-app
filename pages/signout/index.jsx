import { useRouter } from "next/router";

import MainLayout from "@/Layouts/MainLayout";
import { useIsLoggedIn } from "@/hooks";

export default function SignOut() {
  const router = useRouter();
  const { isLoggedIn } = useIsLoggedIn();

  function handleLoginLogout() {
    if (isLoggedIn) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
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
