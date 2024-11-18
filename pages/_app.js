import { store } from "@/redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import "react-bootstrap";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import { Toaster } from "react-hot-toast";
import { Provider as ReduxProvider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import "swiper/css";
import "swiper/css/pagination";
import { GoogleTagManager } from "@next/third-parties/google";

import "@/styles/globals.scss";
const persistor = persistStore(store);
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          property="og:title"
          content="Bogura Theke - Order Yogurt From Bogura"
        />
        <meta property="og:image" content="/images/logo.png" />
        <meta property="og:url" content="https://boguratheke.com" />
        <meta property="og:type" content="website" />
      </Head>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NextNProgress color="#F9AB1A" />
          <Toaster />
          <Component {...pageProps} />
          <GoogleTagManager gtmId="GTM-P55QJ5HR" />
          <FloatingWhatsApp
            accountName="Bogura Theke"
            phoneNumber="+880 0133-2743232"
            avatar="/images/rounded-icon.png"
            chatMessage="হাই, আমি কীভাবে সাহায্য করতে পারি?"
            statusMessage="Typically replies quickly..."
            notification={false}
          />
        </PersistGate>
      </ReduxProvider>
    </>
  );
}
