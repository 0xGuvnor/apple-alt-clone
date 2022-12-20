import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { AnimatePresence } from "framer-motion";

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
  router,
}: AppProps) {
  const route = router.route;

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Toaster toastOptions={{ duration: 4000 }} />
        <AnimatePresence
          mode="wait"
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <Component {...pageProps} key={route} />
        </AnimatePresence>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
