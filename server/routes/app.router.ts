import { createRouter } from "server/createRouter";
import { postRouter } from "./post.router";
import { userRouter } from "./user.router";

// note: 그큐엘 쿼리/뮤테이션처럼 하면 된다
// 라우터를 여러 파일로 세분화시켰다면 .merge로 붙여주면 됨
export const AppRouter = createRouter()
  .merge("users.", userRouter)
  .merge("posts.", postRouter);

export type AppRouter = typeof AppRouter;
