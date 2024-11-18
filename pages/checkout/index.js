import CheckoutPage from "@/src/page-components/checkout/CheckoutPage";
import CheckOutRoute from "@/src/routes/checkoutRoute";

import Head from "next/head";

export default function Checkout() {
  return (
    <CheckOutRoute>
      <Head>
        <title>Bogura Theke - Checkout</title>
        <meta name="description" content="Bogurar Shera Doi" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CheckoutPage />
    </CheckOutRoute>
  );
}
