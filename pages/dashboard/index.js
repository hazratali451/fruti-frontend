import DashboardPage from "@/src/page-components/dashboard/DashboardPage";
import PrivateRoute from "@/src/routes/privateRoute";

import Head from "next/head";

export default function Checkout() {
  return (
    <PrivateRoute>
      <Head>
        <title>Bogura Theke</title>
        <meta name="description" content="Bogurar Shera Doi" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardPage />
    </PrivateRoute>
  );
}
