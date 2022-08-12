import { router } from "@trpc/server";
import { Context } from "./createContext";
import superjson from "superjson";

// tRPC의 라우터는 타입의 연결다리 역할
export function createRouter() {
  // note: createContext로 들어온 타입들을 제네릭으로 받는다
  // .transform를 붙여 모든 라우터들에 연결
  return router<Context>().transformer(superjson);
} 
