import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import logo from "@/public/devto_logo.png";
import Image from "next/image";
import Uppy from "@uppy/core";
import Transloadit from "@uppy/transloadit";
import clsx from "clsx";
import { useRouter } from "next/router";

import { createPost } from "@/utils/api";

export default function NewPost() {
  const router = useRouter();
  const [preview, setPreview] = useState(false);
  const [uppy, setUppy] = useState();
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [image, setImageUrl] = useState("");
  const [errorFile, setErrorFile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [token, setToken] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    watch,
  } = useForm();

  const title = watch("title");
  const post = watch("post");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setToken(token);
    }
  }, []);

  async function onSubmit(data) {
    const user = localStorage.getItem("user");
    if (!image) {
      setErrorFile(true);
      return null;
    } else {
      try {
        setIsSubmitting(true);
        const post = await createPost(
          data.post,
          image,
          data.title,
          user,
          token
        );
        if (post) {
          router.push("/");
          setIsSubmitting(false);
          return;
        }
        setError("root.data", {
          type: "manual",
          message: "Invalid post",
        });
        setIsSubmitting(false);
      } catch (error) {
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
    <>
      <header className="top-0 flex pl-9 pr-9 items-center w-full h-[56px]">
        <div className="w-full flex items-center justify-between gap-3 basis-4/5">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Image
                className="pr-2 hidden md:block"
                src={logo}
                alt="Devto"
                width={60}
                height={40}
              />
            </Link>
            <span className="hidden md:block">Create Post</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="hover:text-[#3b49df] hover:bg-[#e2e1f3] p-2 rounded-[5px]"
              onClick={() => {
                setPreview(false);
              }}
            >
              Edit
            </button>
            <button
              className="hover:text-[#3b49df] hover:bg-[#e2e1f3] p-2 rounded-[5px]"
              onClick={() => {
                setPreview(true);
              }}
            >
              Preview
            </button>
          </div>
        </div>
        <div className="w-full flex items-center justify-end gap-2 basis-1/5 sm:basis-2/5">
          <Link href="/">
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
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </Link>
        </div>
      </header>

      <main className="flex pl-0 sm:pl-9 pr:0 sm:pr-9 items-start mx-auto w-[full] sm:w-[85%] mt-3 gap-4">
        {!preview && (
          <div className="w-full md:basis-4/5 rounded-[5px] bg-white border border-[#d4d4d4]">
            <div className="flex flex-col pr-[50px] pl-[50px]">
              <label className="text-[#9ca4af] medium pt-6 bold">
                Cover Image
              </label>
              <input
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
            <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col  pl-[50px]">
                <input
                  className={clsx(
                    "text-[44px] pt-6  pr-[50px] pb-4  bold text-zinc-950 focus:outline-none",
                    {
                      "border-red-700 text-red-700": errors.name,
                    }
                  )}
                  {...register("title", {
                    required: {
                      value: true,
                      message: "Enter your Post Tittle",
                    },
                  })}
                  placeholder="New post title here..."
                  type="text"
                />
                {errors.title && (
                  <span className="text-[14px] text-red-700 mb-4">
                    {errors.title.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col mt-12 pr-[50px] pb-4 pl-[50px]">
                <textarea
                  className={clsx(
                    "text-[15px] h-[150px] bold text-zinc-950 focus:outline-none",
                    {
                      "border-red-700": errors.name,
                    }
                  )}
                  {...register("post", {
                    required: {
                      value: true,
                      message: "Enter your Post",
                    },
                  })}
                  type="text"
                ></textarea>
                {errors.post && (
                  <span className="text-[14px] text-red-700">
                    {errors.post.message}
                  </span>
                )}
              </div>
              <div className="flex pl-[50px] sm:pl-0 pr:0 sm:pr-9 items-start mx-auto w-[full] sm:w-[85%] mt-3 gap-4 mb-10">
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
                    "Enviar"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
        {preview && (
          <div className="w-full flex flex-col md:basis-4/5 rounded-[5px] bg-white border border-[#d4d4d4] p-[50px]">
            <img className="w-[100%]" src={image} alt="" />
            <h3 className="text-[35px] bold leading-[40px] mb-4 mt-4">
              {title}
            </h3>
            <p className="text-[20px] mt-[40px]">{post}</p>
          </div>
        )}
        <div className="basis-1/ max-w-[309px] pt-[10%] hidden md:block">
          <h4 className="bold text-[19px]">Publishing Tips</h4>
          <ul className="list-disc pl-3">
            <li className="text-[#575757] mt-2 mb-2">
              Ensure your post has a cover image set to make the most of the
              home feed and social media platforms.
            </li>
            <li className="text-[#575757] mb-2">
              Share your post on social media platforms or with your co-workers
              or local communities.
            </li>
            <li className="text-[#575757] mb-2">
              Ask people to leave questions for you in the comments. It&#39;s a
              great way to spark additional discussion describing personally why
              you wrote it or why people might find it helpful.
            </li>
          </ul>
        </div>
      </main>
    </>
  );
}
