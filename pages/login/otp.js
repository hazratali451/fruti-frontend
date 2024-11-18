"use client";
import Layout from "@/src/components/Layout";
import OtpPage from "@/src/page-components/login/OtpPage";
import FreeRoute from "@/src/routes/freeRoute";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

export default function Login() {
  const router = useRouter();
  const [cookies] = useCookies(["user"]);

  if (!cookies.token) {
    router.push("/login");
  } else {
    return (
      <FreeRoute>
        <Head>
          <title>Bogura Theke</title>
          <meta name="description" content="Bogurar Shera Doi" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout>
          <>
            <OtpPage />
          </>
        </Layout>
      </FreeRoute>
    );
  }
}
