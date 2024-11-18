import Language from "@/src/helper/Language";
import HomePage from "@/src/page-components/home/HomePage";

import Head from "next/head";
import { useSelector } from "react-redux";

export default function Home({ products }) {
  const language = useSelector((state) => state.language.language);
  return (
    <>
      <Head>
        <title>
          {language === "BN"
            ? "বগুড়া থেকে - অর্ডার করুন বগুড়ার সেরা দই"
            : "Bogura Theke - Order The Best Doi From Bogura"}
        </title>
        <meta name="description" content="Bogurar Shera Doi" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage products={products} />
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/products`);
  const data = await res.json();
  return {
    props: {
      products: data.products,
    },
  };
}
