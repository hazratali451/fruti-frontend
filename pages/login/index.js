import LoginPage from "@/src/page-components/login/LoginPage";
import FreeRoute from "@/src/routes/freeRoute";
import Head from "next/head";

export default function Login() {
  return (
    <FreeRoute>
      <Head>
        <title>Login - Bogura Theke</title>
        <meta name="description" content="Login - Bogura Theke" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoginPage />
    </FreeRoute>
  );
}
