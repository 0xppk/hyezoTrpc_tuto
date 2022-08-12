import LoginForm from "@/components/LoginForm";
import { useUserContext } from "@/context/user.context";
import Link from "next/link";

export default function Home() {
  // useQuery는 어레이를 인자로
  // 어레이의 첫번째는 쿼리고, 인자가 필요한 쿼리면 두번째 프로퍼티에 놓는다
  const user = useUserContext();
  if (!user) return <LoginForm />;
  return (
    <div>
      <Link href="/posts/new">Create post</Link>
    </div>
  );
}
