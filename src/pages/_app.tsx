import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AppRouter } from "server/routes/app.router";
import { withTRPC } from "@trpc/next";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import superjson from "superjson";
import { url } from "../../constants";
import { trpc } from "@/utils/trpc";
import LoginForm from "@/components/LoginForm";
import { UserContextProvider } from "@/context/user.context";

function MyApp({ Component, pageProps }: AppProps) {
  const { data, error, isLoading } = trpc.useQuery(["users.me"]);

  if (isLoading) return <div>Loading User...</div>;

  return (
    <UserContextProvider value={data}>
      <main>
        <Component {...pageProps} />
      </main>
    </UserContextProvider>
  );
}

// todo add AppRouter to generic
export default withTRPC<AppRouter>({
  config({ ctx }) {
    const links = [
      loggerLink(),
      httpBatchLink({
        maxBatchSize: 10,
        url: url,
      }),
    ];

    return {
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 60,
          },
        },
      },
      headers() {
        if (ctx?.req) {
          return {
            // 요청한 헤더 정보, 쿠키 등등
            ...ctx.req.headers,
            // 서버 on 확인
            "x-ssr": "1",
          };
        }
        // 서버가 안 켜졌으면 no return
        return {};
      },
      links,
      transformer: superjson,
    };
  },

  ssr: false,
})(MyApp);
