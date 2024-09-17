import Link from "next/link";

export default function ActiveDiscussions({ post }) {
  return (
    <div className="bg-white border border-[#d4d4d4] rounded-[5px]">
      <h3 className="bold text-[20px] pl-5 pr-5 pt-4 mb-4">
        Active discussions
      </h3>
      {post.slice(0, 5).map((publication) => {
        return (
          <div
            className="pl-5 pr-5 mb-4 border-t-2 pt-2 border-[#d4d4d4]"
            key={publication._id}
          >
            <Link
              className="text-[#404040]  hover:text-[#2f3ab2]"
              href={`/publications/${publication._id}`}
            >
              {publication.title}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
