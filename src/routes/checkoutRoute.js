import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const CheckOutRoute = ({ children }) => {
  const cart = useSelector((state) => state.cart);
  const router = useRouter();

  if (cart.cartList.length) {
    {
      return children;
    }
  } else {
    router.push(`/`);
  }
};

export default CheckOutRoute;
