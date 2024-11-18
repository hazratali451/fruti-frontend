/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useExecuteBkashPaymentMutation } from "@/redux/slices/apiSlices/OrderApiSlice";
import { setRemoveAllFromCart } from "@/redux/slices/cartSlice";
import Layout from "@/src/components/Layout";
import Language from "@/src/helper/Language";
import Loader from "@/utls/Loader/Loader";
import { successToast } from "@/utls/toasts/toast";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Stepper } from "../checkout/AccountPage";
import axios from "axios";
const SuccessOrder = () => {
  const router = useRouter();
  const { query } = router;
  const order = query.order;
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("comming");
    const completeOrder = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/orders/send-order?orderNumber=${order}`
        );
        console.log("Order completion response:", response.data);
      } catch (error) {
        console.error(
          "Error completing order:",
          error.response ? error.response.data : error.message
        );
      }
    };

    completeOrder();
  }, [order]);

  if (router.isReady && !order) {
    router.push("/");
  }

  /*  if (isLoading) {
    loadingToast("Verifying Payment...");
    return <Loader />;
  } */

  successToast("Payment Verified Successfully.");
  dispatch(setRemoveAllFromCart());
  return (
    <Layout>
      <div className="py-5">
        <div className="container">
          <Stepper step={"thank-you"} />
          <div className="text-center success-card">
            <div className="mb-4">
              <Image
                width={70}
                height={70}
                src="/images/check.png"
                alt="check"
              />
            </div>
            <h5 className="mb-3">
              <Language
                data={{
                  en: "Your Order is Completed",
                  bn: "অর্ডার টি সফলভাবে প্লেস হয়েছে",
                }}
              />
            </h5>
            <p className="mb-4">
              <Language
                data={{
                  en: `Thank you for your order! Your order has been confirmed. And
                your order number is : #${order}`,
                  bn: `আপনার অর্ডার এর জন্য ধন্যবাদ! আপনার অর্ডার টি নিশ্চিত হয়েছে। আপনার অর্ডার নাম্বারঃ #${order}`,
                }}
              />
            </p>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <Link href="/" className="btn btn-outline-base">
                Continue Shopping
              </Link>

              <Link href={`/dashboard`} className="btn btn-base">
                Track Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

/* if (isError) {
  errorToast("Payment Execution Failed");
  console.log({ error: isError });
} */

export default SuccessOrder;
