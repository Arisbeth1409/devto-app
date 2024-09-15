import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import UserComponent from "./UserComponent";

import Image from "next/image";
import logo from "@/public/devto_logo.png";
import { useIsLoggedIn } from "@/hooks";

export default function Header() {
  const [menuMobile, setMenuMobile] = useState(false);
  const { handleSubmit, register } = useForm();
  const { isLoggedIn } = useIsLoggedIn();

  function onSubmit(data) {
    console.log(data);
  }

  function handeShowMenu() {
    setMenuMobile(!menuMobile);
  }

  return (
    <>
      {menuMobile && <div>Mobile Menu</div>}
      <header className="fixed top-0  flex pl-9 pr-9 items-center w-full h-[56px] bg-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.10)]">
        <div className="w-full flex items-center gap-3">
          <button onClick={handeShowMenu} className="block md:hidden h-[56px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
          <Link href="/">
            <Image
              className="pr-2"
              src={logo}
              alt="Devto"
              width={60}
              height={40}
            />
          </Link>

          <form
            className="hidden md:block w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex relative w-full">
              <input
                placeholder="Search..."
                {...register("search")}
                className="max-w-[680px] w-full h-[39px] pl-[40px] border border-[#d4d4d4] rounded"
                type="text"
              />
              <button className="absolute bottom-[8px] left-[6px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
              <div className="absolute bottom-[8px] right-[28px]">
                <span className="flex items-center text-[13px] gap-1 text-[#717171]">
                  Powered By
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Layer_1"
                    width="12"
                    height="12"
                    viewBox="0 0 500 500.34"
                  >
                    <defs></defs>
                    <path
                      className="fill-[#717171]"
                      d="M250,0C113.38,0,2,110.16,.03,246.32c-2,138.29,110.19,252.87,248.49,253.67,42.71,.25,83.85-10.2,120.38-30.05,3.56-1.93,4.11-6.83,1.08-9.52l-23.39-20.74c-4.75-4.22-11.52-5.41-17.37-2.92-25.5,10.85-53.21,16.39-81.76,16.04-111.75-1.37-202.04-94.35-200.26-206.1,1.76-110.33,92.06-199.55,202.8-199.55h202.83V407.68l-115.08-102.25c-3.72-3.31-9.43-2.66-12.43,1.31-18.47,24.46-48.56,39.67-81.98,37.36-46.36-3.2-83.92-40.52-87.4-86.86-4.15-55.28,39.65-101.58,94.07-101.58,49.21,0,89.74,37.88,93.97,86.01,.38,4.28,2.31,8.28,5.53,11.13l29.97,26.57c3.4,3.01,8.8,1.17,9.63-3.3,2.16-11.55,2.92-23.6,2.07-35.95-4.83-70.39-61.84-127.01-132.26-131.35-80.73-4.98-148.23,58.18-150.37,137.35-2.09,77.15,61.12,143.66,138.28,145.36,32.21,.71,62.07-9.42,86.2-26.97l150.36,133.29c6.45,5.71,16.62,1.14,16.62-7.48V9.49C500,4.25,495.75,0,490.51,0H250Z"
                    ></path>
                  </svg>
                  algolia
                </span>
              </div>
            </div>
          </form>
        </div>
        <div className="w-full flex items-center justify-end gap-2">
          {isLoggedIn && (
            <>
              <PrimaryButton
                text="
           Create post
         "
                href="/publications/create"
                underline={true}
              />
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                  />
                </svg>
              </button>
              <UserComponent />
            </>
          )}
          {!isLoggedIn && (
            <>
              <SecondaryButton
                className="w-[76px]"
                text="Log in"
                underline={true}
                justify="justify-center"
                href="/login"
              />
              <PrimaryButton
                text="
            Create account
          "
                href="/new-user"
                underline={true}
              />
            </>
          )}
        </div>
      </header>
    </>
  );
}
