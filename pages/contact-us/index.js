import ContactPage from "@/src/page-components/contact/ContactPage";

import Head from "next/head";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us - Bogura Theke</title>
        <meta
          name="description"
          content="Contact us page for boguratheke.com website and from here users can contact with us to get support"
        />
      </Head>
      <ContactPage />
    </>
  );
}
