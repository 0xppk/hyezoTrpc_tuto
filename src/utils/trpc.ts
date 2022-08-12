import { createReactQueryHooks } from "@trpc/react";
import { AppRouter } from "server/routes/app.router";

// todo add appRouter as generic
// 제네릭에 넣고나면 trpc에서 쿼리, 뮤테이션, 필요한 아규먼츠, 리턴값까지 알게 됨.
export const trpc = createReactQueryHooks<AppRouter>();
 