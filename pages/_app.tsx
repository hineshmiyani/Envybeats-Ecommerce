import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { Layout } from "../components";
import StateContext from "../context/StateContext";
import { Session } from "next-auth";
import "../styles/globals.css";

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  return (
    <SessionProvider session={pageProps.session}>
      <StateContext>
        <Layout>
          <>
            <Toaster />
            <Component {...pageProps} />
          </>
        </Layout>
      </StateContext>
    </SessionProvider>
  );
}

export default MyApp;
