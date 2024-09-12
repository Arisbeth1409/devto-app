import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import { login } from "@/utils/api";
import logo from "@/public/devto_logo.png";
import jsonData from "@/public/icons.json";
import LoginButton from "@/components/LoginButton";

export default function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm();

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(data) {
    try {
      setIsSubmitting(true);
      const token = await login(data.email, data.password);
      if (token) {
        localStorage.setItem("token", token.token);
        localStorage.setItem("user", token.user);
        router.push("/");
        setIsSubmitting(false);
        return;
      }
      setError("root.data", {
        type: "manual",
        message: "Invalid data",
      });
      setIsSubmitting(false);
    } catch (error) {
      console.error("login", error);
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  }, []);

  return (
    <main className="mt-10 mb-12 max-w-[544px] p-4 sm:p-[0px] flex justify-center  flex-col items-center mx-auto pt-9">
      <Link href="/">
        <Image className="pr-2" src={logo} alt="Devto" width={70} height={50} />
      </Link>
      <h1 className="bold text-[2rem] mt-4">Join the DEV Community</h1>
      <p className="text-[#404040] text-center">
        DEV Community is a community of 2,033,865 amazing developers
      </p>
      <div className="flex flex-col mt-6 mb-6 w-full gap-3">
        {jsonData?.[0]?.loginButtons.map((button, index) => {
          return (
            <LoginButton
              text={button.text}
              icon={button.icon}
              key={`${index}-${button.text}`}
            />
          );
        })}
      </div>
      <div className="relative mt-4 border-b-2 w-full border-x-zinc-500  text-center text-[15px] text-[#737373]">
        <span className="absolute bottom-[-13px] bg-[#f5f5f5] w-[40px]">
          OR
        </span>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-2 mt-4"
      >
        <label className="text-[#171717] medium">Email</label>
        <input
          className={clsx(
            "bg-white p-[8px] h-[39px] rounded-[5px] border border-[#d4d4d4] focus:border-[#3b49df]",
            {
              "border-red-700": errors.email,
            }
          )}
          type="text"
          {...register("email", {
            required: {
              value: true,
              message: "Enter your Email",
            },
          })}
        />
        {errors.email && (
          <span className="text-[14px]">{errors.email.message}</span>
        )}
        <label className="text-[#171717] medium">Password</label>
        <input
          className={clsx(
            "bg-white p-[8px] h-[39px] rounded-[5px] border border-[#d4d4d4] focus:border-[#3b49df]",
            {
              "border-red-700": errors.password,
            }
          )}
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "Enter your password",
            },
          })}
        />
        {errors.password && (
          <span className="text-[14px]">{errors.password.message}</span>
        )}
        {errors.root?.data && (
          <span className="text-center text-red-700">
            {errors.root.data.message}
          </span>
        )}
        <button
          className="h-[48px] bg-[#3b49df] mt-8 text-white hover:bg-[#2f3ab2] rounded-[5px]"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? (
            <div className="flex justify-center items-center">
              <svg
                className="animate-spin h-8 w-8 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="#ffffff"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
            </div>
          ) : (
            "Log in"
          )}
        </button>
        <p className="border-b-2 pb-5 border-x-zinc-500 italic text-center text-[15px] mt-3 text-[#737373]">
          By signing in, you are agreeing to our privacy{" "}
          <span className="text-[#3b49df]">policy, terms of use</span>
          <span className="text-[#3b49df]">and code of conduct.</span>
        </p>
        <p className="text-[16px] text-center">
          New to DEV Community?{" "}
          <span className="text-[#3b49df]">Create account.</span>
        </p>
      </form>
    </main>
  );
}
