import { useState } from "react";

import DefaulImage from "@/public/default_user.png";
import SecondaryButton from "./SecondaryButton";

export default function Avatar({ user }) {
  const [showDataUser, setShowDataUser] = useState(false);
  const { name, email, profilePic } = user;

  return (
    <>
      <button
        onClick={() => {
          setShowDataUser(!showDataUser);
        }}
        className="rounded-full border-2 border-transparent hover:border-indigo-500/50"
      >
        <img
          className="rounded-full w-[30px] h-[30px]"
          src={profilePic || DefaulImage}
          alt="user-image"
        />
      </button>
      {showDataUser && (
        <div className="flex gap-2 flex-col p-4 absolute w-[234px] bg-white  right-[28px] border border-[#d4d4d4] rounded-[5px] top-[50px]">
          <span className="text-[#404040] bold">{name}</span>
          <span className="border-b-[1px] text-[#404040]  border-[#d4d4d4] pb-3">
            {email}
          </span>
          <SecondaryButton text="Create Post" underline={true} href="/" />
          <hr />
          <SecondaryButton text="Sign Out" underline={true} href="signout" />
        </div>
      )}
    </>
  );
}
