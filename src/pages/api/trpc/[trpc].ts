import * as trpcNext from "@trpc/server/adapters/next";
import { createContext } from "server/createContext";
import { AppRouter } from "server/routes/app.router";

// tRPC는 Next.js의 Handler를 하이재킹
export default trpcNext.createNextApiHandler({
  router: AppRouter,
  createContext,
  onError({ error }) {
    if (error.code === "INTERNAL_SERVER_ERROR") {
      console.error("Something went wrong", error);
    } else {
      console.error(error);
    }
  },
});
