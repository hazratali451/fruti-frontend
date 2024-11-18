import Layout from "@/src/components/Layout";
import Banner from "./components/Banner";
import BlogSection from "./components/BlogSection";
import ClientSection from "./components/ClientSection";
import FAQs from "./components/FAQs";
import ProductSection from "./components/ProductSection";
const HomePage = ({ products }) => {
  return (
    <>
      <Layout>
        <Banner />
        <ProductSection products={products} />
        <FAQs />
        <ClientSection />

        {/*  <BlogSection /> */}
      </Layout>
    </>
  );
};

export default HomePage;
