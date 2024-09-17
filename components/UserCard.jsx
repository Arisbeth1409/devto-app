export default function UserCard({ profilePic, userName, email }) {
  return (
    <div className="bg-white border border-[#d4d4d4] rounded-[5px] p-5">
      <div className="flex gap-4 flex-col">
        <div className="flex gap-4">
          <img
            className="rounded-full w-[30px] h-[30px]"
            src={profilePic}
            alt="user-image"
          />
          <div className="flex flex-col">
            <span>{userName}</span>
            <span>{email}</span>
          </div>
        </div>
        <button className="h-[48px] bg-[#3b49df] mt-8 text-white hover:bg-[#2f3ab2] rounded-[5px]">
          Follow
        </button>
      </div>
    </div>
  );
}
