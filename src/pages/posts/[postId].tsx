import { trpc } from "@/utils/trpc";
import Error from "next/error";
import { useRouter } from "next/router";

export default function SinglePostPage() {
  const router = useRouter();
  const postId = router.query.postId as string;
  console.log(router);
  const { data, isLoading } = trpc.useQuery(["posts.single-post", { postId }]);

  if (isLoading) return <div>Loading posts...</div>;
  if (!data) return <Error statusCode={404} />;
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.body}</p>
    </div>
  );
}
