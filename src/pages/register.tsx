import { CreateUserInput } from "@/schema/user.schema";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const { handleSubmit, register } = useForm<CreateUserInput>();
  const { mutate, error } = trpc.useMutation(["users.resister-user"], {
    onSuccess: () => {
      router.push("/login");
    },
  });

  function onSubmit(values: CreateUserInput) {
    mutate(values);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && error.message}
        <h1>Resister</h1>
        <input
          type="email"
          placeholder="myEmail@example.com"
          {...register("email")}
        />
        <br />
        <input type="text" placeholder="myName" {...register("name")} />
        <button type="submit">Resister</button>
      </form>
      <Link href="login">Login</Link>
    </>
  );
}
