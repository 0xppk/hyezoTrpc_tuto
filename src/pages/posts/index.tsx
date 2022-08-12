import { trpc } from "@/utils/trpc";
import Link from "next/link";

export default function PostListingPage() {
  const { data, isLoading } = trpc.useQuery(["posts.posts"]);
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {data?.map((post) => {
        return (
          <article key={post.id}>
            <p>{post.title}</p>
            <Link href={`/posts/${post.id}`}>Read post</Link>
          </article>
        );
      })}
    </div>
  );
}
