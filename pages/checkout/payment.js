import PaymentPage from "@/src/page-components/checkout/PaymentPage";

import Head from "next/head";

export default function Payment() {
  return (
    <>
      <Head>
        <title>Bogura Theke - Payment</title>
        <meta name="description" content="Bogurar Shera Doi" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PaymentPage />
    </>
  );
}
