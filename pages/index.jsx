import MainLayout from "@/Layouts/MainLayout";
import { getAllPost } from "@/utils/api";
import Post from "@/components/Post";

import NavLinks from "@/components/NavLinks";
import SocialNetworks from "@/components/SocialNetwork";
import MyTags from "@/components/MyTags";
import LoginNav from "@/components/LoginNav";
import { useIsLoggedIn } from "@/hooks";
import ActiveDiscussions from "@/components/ActiveDiscussions";

export default function Home({ posts }) {
  const { isLoggedIn } = useIsLoggedIn();

  return (
    <MainLayout>
      <div className="flex w-full pt-[75px] gap-3">
        <aside className="basis-1/4 hidden md:block">
          {!isLoggedIn && <LoginNav />}
          <NavLinks navLinks={true} />
          <NavLinks />
          <SocialNetworks />
          <MyTags />
        </aside>
        <main className="basis-5/5 md:basis-3/5 flex flex-col gap-2">
          {posts.map((post, index) => {
            return (
              <Post
                isDetailPost={false}
                id={post._id}
                index={index}
                image={post.image}
                title={post.title}
                key={post._id}
                user={post.user}
                createAt={post.createAt}
              />
            );
          })}
        </main>
        <aside className="basis-1/4 hidden md:block">
          <ActiveDiscussions post={posts} />
        </aside>
      </div>
    </MainLayout>
  );
}

export async function getStaticProps() {
  const posts = await getAllPost();
  return {
    props: {
      posts,
    },
    revalidate: 60,
  };
}
