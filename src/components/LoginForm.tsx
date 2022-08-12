import { CreateUserInput } from "@/schema/user.schema";
import { trpc } from "@/utils/trpc";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

function VerifyToken({ hash }: { hash: string }) {
  const router = useRouter();
  const { data, isLoading } = trpc.useQuery([
    "users.verify-otp",
    {
      hash,
    },
  ]);
  if (isLoading) return <p>Verifying...</p>;
  router.push(data?.redirect.includes("login") ? "/" : data?.redirect || "/");
  return <p>Redirecting...</p>;
}

export default function LoginForm() {
  const router = useRouter();
  const { handleSubmit, register } = useForm<CreateUserInput>();
  const [success, setSuccess] = useState(false);
  const { mutate, error } = trpc.useMutation(["users.request-otp"], {
    onSuccess: () => {
      setSuccess(true);
    },
  });

  function onSubmit(values: CreateUserInput) {
    mutate({ ...values, redirect: router.asPath });
  }

  const hash = router.asPath.split("#token=")[1];
  if (hash) {
    return <VerifyToken hash={hash} />;
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && error.message}
        {success && <p>Check Your Email</p>}
        <h1>Login</h1>
        <input
          type="email"
          placeholder="myEmail@example.com"
          {...register("email")}
        />

        <button>Login</button>
      </form>
      <Link href="register">Register</Link>
    </>
  );
}
