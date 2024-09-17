import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import MainLayout from "@/Layouts/MainLayout";
import { getPost } from "@/utils/api";

import Post from "@/components/Post";
import UserCard from "@/components/UserCard";

export default function PostList() {
  const [post, setPost] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;
    getPost(id)
      .then((data) => {
        setPost(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <MainLayout>
      <div className="flex justify-center flex-col sm:flex-row w-full pt-[75px] gap-3">
        <aside className="basis-1/12 hidden md:block"></aside>
        <main className="basis-8/12 sm:basis-3/5 flex flex-col gap-2">
          <Post
            isDetailPost={true}
            user={post.user}
            title={post.title}
            image={post.image}
            createAt={post.createAt}
            body={post.body}
          />
        </main>
        <aside className="basis-3/12">
          <UserCard
            profilePic={post.user?.profilePic}
            userName={post.user?.userName}
            email={post.user?.email}
          />
        </aside>
      </div>
    </MainLayout>
  );
}
