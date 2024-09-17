import clsx from "clsx";

import DefaulImage from "@/public/default_user.png";

export default function Post({
  title,
  image,
  body,
  createAt,
  user,
  index,
  id,
  isDetailPost,
}) {
  return (
    <article className="bg-white border border-[#d4d4d4] rounded-[5px]">
      <a href={`${isDetailPost ? "" : `/publications/${id}`}`}>
        {(index === 0 || isDetailPost) && (
          <img className="rounded-t-lg w-[100%]" src={image} alt="" />
        )}
        <div className="p-[1.5rem]">
          <div className="flex gap-4 items-start">
            {user && (
              <>
                <img
                  className="rounded-full profilePic h-[40px] w-[40px]"
                  src={user?.profilePic || DefaulImage}
                  alt={user?.name}
                />
                <div className="mb-5 flex flex-col justify-center">
                  <p>{user?.name}</p>
                  <p>{createAt}</p>
                </div>
              </>
            )}
          </div>
          <h3
            className={clsx(
              `bold hover:text-[#3b49df] text-[30px] leading-[35px]`,
              {
                "text-[25px] leading-[40px] sm:text-[50px] sm:leading-[60px]":
                  isDetailPost,
              }
            )}
          >
            {title}
          </h3>
          {isDetailPost && <p className="text-[20px] mt-[40px]">{body}</p>}
        </div>
      </a>
    </article>
  );
}
