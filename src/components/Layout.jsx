import CartSidebar from "./CartSidebar";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <CartSidebar />
      <Footer />
    </>
  );
};

export default Layout;
