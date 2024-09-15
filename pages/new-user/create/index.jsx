import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import Uppy from "@uppy/core";
import Transloadit from "@uppy/transloadit";
import { useRouter } from "next/router";

import { userRegister } from "@/utils/api";

export default function CreateUser() {
  const router = useRouter();
  const [uppy, setUppy] = useState();
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [errorFile, setErrorFile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    watch,
  } = useForm();

  const password = watch("password");

  async function onSubmit(data) {
    if (!imageUrl) {
      setErrorFile(true);
      return null;
    } else {
      try {
        setIsSubmitting(true);
        const user = await userRegister(
          data.name,
          data.username,
          data.password,
          data.email,
          imageUrl
        );
        if (user) {
          router.push("/login");
          setIsSubmitting(false);
          return;
        }
        setError("root.data", {
          type: "manual",
          message: "Invalid data",
        });
        setIsSubmitting(false);
      } catch {
        console.error("login", error);
        setIsSubmitting(false);
      }
    }
  }

  const onCompleteUploadFiles = (assembly) => {
    const image = assembly.results?.compress_image[0].ssl_url;

    setImageUrl(image);
    setIsUploadingFile(false);
    setErrorFile(false);
  };

  const onFileInputChange = (event) => {
    setIsUploadingFile(true);
    setErrorFile(false);

    const file = Array.from(event.target.files)[0] || null;

    if (file) {
      uppy.reset();
      uppy.addFile({
        name: file.name,
        type: file.type,
        data: file,
      });

      uppy.upload();
    }
  };

  useEffect(() => {
    const uppyInstance = new Uppy({
      restrictions: {
        maxNumberOfFiles: 1,
      },
    })
      .use(Transloadit, {
        params: {
          auth: { key: process.env.NEXT_PUBLIC_TRANSLOADIT_AUTH_KEY },
          template_id: process.env.NEXT_PUBLIC_TRANSLOADIT_TEMPLATE_ID,
        },
        waitForEncoding: true,
      })
      .on("transloadit:complete", onCompleteUploadFiles);

    setUppy(uppyInstance);
  }, []);

  return (
    <main className="rounded-[5px] bg-white border border-[#d4d4d4] mt-10 mb-12 w-[90%] sm:max-w-[544px]  sm:p-[0px] flex   flex-col mx-auto">
      <div className="p-[25px]">
        <h1 className="bold text-[19px]">Create your account</h1>
        <div className=" mt-4 flex flex-col gap-2">
          <label className="text-[#171717] medium">
            Profile image <span className="text-red-600">*</span>
          </label>
          <input
            className="border border-[#d4d4d4] p-3 rounded-[5px]"
            type="file"
            name="file"
            id="file"
            onChange={onFileInputChange}
          />
          {errorFile && (
            <span className="text-[14px] text-red-600">Add the file</span>
          )}
          <p className="text-red-600 text-[14px]">
            {isUploadingFile ? "Uploading file" : ""}
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-2"
        >
          <label className="text-[#171717] medium">
            Name <span className="text-red-600">*</span>
          </label>
          <input
            className={clsx(
              "bg-white p-[8px] h-[39px] rounded-[5px] border border-[#d4d4d4] focus:border-[#3b49df]",
              {
                "border-red-700": errors.name,
              }
            )}
            type="text"
            {...register("name", {
              required: {
                value: true,
                message: "Enter your Name",
              },
            })}
          />
          {errors.name && (
            <span className="text-[14px]">{errors.name.message}</span>
          )}
          <label className="text-[#171717] medium">
            User Name <span className="text-red-600">*</span>
          </label>
          <input
            className={clsx(
              "bg-white p-[8px] h-[39px] rounded-[5px] border border-[#d4d4d4] focus:border-[#3b49df]",
              {
                "border-red-700": errors.username,
              }
            )}
            type="text"
            {...register("username", {
              required: {
                value: true,
                message: "Enter your User Name",
              },
            })}
          />
          {errors.username && (
            <span className="text-[14px]">{errors.username.message}</span>
          )}
          <label className="text-[#171717] medium">
            Email <span className="text-red-600">*</span>
          </label>
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
          <label className="text-[#171717] medium">
            Password <span className="text-red-600">*</span>
          </label>
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
                message: "Enter your Password",
              },
            })}
          />
          {errors.password && (
            <span className="text-[14px]">{errors.password.message}</span>
          )}
          <label className="text-[#171717] medium">
            Password Confirmation <span className="text-red-600">*</span>
          </label>
          <input
            className={clsx(
              "bg-white p-[8px] h-[39px] rounded-[5px] border border-[#d4d4d4] focus:border-[#3b49df]",
              {
                "border-red-700": errors.passwordvalidate,
              }
            )}
            type="password"
            {...register("passwordvalidate", {
              required: {
                value: true,
                message: "Validate your Password",
              },
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.passwordvalidate && (
            <span className="text-[14px]">
              {errors.passwordvalidate.message}
            </span>
          )}
          <button
            className="h-[48px] bg-[#3b49df] mt-8 text-white hover:bg-[#2f3ab2] rounded-[5px] w-[100px]"
            disabled={isSubmitting}
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
              "Sign up"
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
