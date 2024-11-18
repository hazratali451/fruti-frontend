import { useGetOrderQuery } from "@/redux/slices/apiSlices/OrderApiSlice";
import {
  useBkashPaymentMutation,
  useOtherPaymentMutation,
} from "@/redux/slices/apiSlices/PaymentSlice";
import { InfoIcon } from "@/src/components/Icon";
import Input from "@/src/components/Input";
import Layout from "@/src/components/Layout";
import Language from "@/src/helper/Language";
import enToBnNumber from "@/utls/Language/entoBnNumber";
import Loader from "@/utls/Loader/Loader";
import { errorToast, successToast } from "@/utls/toasts/toast";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Stepper } from "./AccountPage";
import LanguageNumber from "@/src/helper/LanguageNumber";

const PaymentPage = () => {
  const router = useRouter();
  const { query } = router;
  const order_number = query.order;
  const language = useSelector((state) => state.language.language);
  const [active, setActive] = React.useState(null);

  const [activePaymentType, setActivePaymentType] = React.useState(0);
  const [payment_method, setPaymentMethod] = React.useState({
    method: "",
    transection_id_number: "",
  });
  const [payment_type, setPaymentType] = React.useState("online");

  const [paymentTypeList, setPaymentTypeList] = React.useState([]);

  const convertLang = (data) => {
    if (language === "BN") {
      return data.bn;
    } else {
      return data.en;
    }
  };
  const { isError, isSuccess, isLoading, data, error } =
    useGetOrderQuery(order_number);

  //Load the bkash payment mutation
  const [
    bkashPayment,
    {
      isSuccess: isBkashSuccess,
      isError: isBkashError,
      data: bkashData,
      isLoading: isBkashLoading,
      error: bkashError,
    },
  ] = useBkashPaymentMutation();
  //Load other payment mutation
  const [
    otherPayment,
    {
      isSuccess: isOtherPaymentSuccess,
      isError: isOtherPaymentError,
      isLoading: isOtherPaymentLoading,
      error: otherPaymentError,
    },
  ] = useOtherPaymentMutation();

  useEffect(() => {
    if (data?.data?.eligable_cash_on_delivery) {
      //keep cash on delivery and online payment
      setPaymentTypeList(
        all_payment_type.filter((type) => type.id !== 2 && type.id !== 1)
      );
    }
  }, [data?.data]);

  if (isLoading) {
    return <Loader />;
  }

  if (order_number && !isLoading && isError) {
    errorToast(error?.data?.message);
    router.push("/");
  }
  if (isBkashError) {
    errorToast(bkashError?.data?.message);
  }
  const handlePayment = () => {
    if (payment_method.method === "bkash") {
      bkashPayment(order_number);
    } else {
      if (payment_method.method === "cash") {
        otherPayment({
          order_number: order_number,
          body: {
            method: "cash-on-delivery",
          },
        });
      } else {
        if (!payment_method.transection_id_number) {
          errorToast(
            <Language
              data={{
                en: "Please enter the number transaction ID/Number",
                bn: "দয়া করে ট্রাঞ্জেকশন আইডি/নাম্বার লিখুন",
              }}
            />
          );
          return;
        }

        otherPayment({
          order_number: order_number,
          body: {
            method: payment_method.method,
            transection_id_number: payment_method.transection_id_number,
          },
        });
      }
    }
  };

  if (isOtherPaymentSuccess) {
    router.push("/success?order=" + order_number);
  }

  if (isBkashSuccess) {
    router.push(bkashData?.redirectURL);
  }

  if (isOtherPaymentError) {
    errorToast(otherPaymentError?.data?.message);
  }

  if (router.isReady && !order_number) {
    router.push("/");
  } else if (router.isReady && isSuccess && data?.data) {
    return (
      <>
        <Layout>
          <div className="py-5">
            <div className="container">
              <h4
                className="text-center pb-3 pb-lg-4 mb-4 mx-auto"
                style={{ maxWidth: "820px" }}
              >
                <Language
                  data={{
                    en: "Your order has been created, Please select a payment method and pay to confirm your order",
                    bn: "আপনার অর্ডার সফলভাবে তৈরি হয়েছে, অর্ডার নিশ্চিত করতে একটি পেমেন্ট মেথড নির্বাচন করুন এবং পেমেন্ট করুন",
                  }}
                />
              </h4>
              <Stepper step={"thank-you"} />
              <div className="row g-4">
                <div className="col-lg-7 col-xl-8">
                  <div className="d-flex flex-wrap gap-2">
                    {data?.data?.eligable_cash_on_delivery && (
                      <label className="form--label w-100">
                        <Language
                          data={{
                            en: "Payment Type:",
                            bn: "পেমেন্ট এর ধরনঃ",
                          }}
                        />
                      </label>
                    )}
                    {paymentTypeList?.map((type, index) => (
                      <button
                        type="button"
                        key={type.id}
                        className={`__payment-method no-gutter ${
                          activePaymentType === index ? "active" : ""
                        }`}
                        onClick={() => {
                          setPaymentType(type.name);
                          setActivePaymentType(index);
                          setPaymentMethod({
                            ...payment_method,
                            method: type.name,
                          });
                        }}
                      >
                        <div className="d-flex align-items-center">
                          <Image
                            src={type.img}
                            alt={type.lang[language]}
                            // className="me-2"
                            width={40}
                            height={40}
                          />
                        </div>
                        <Language data={type.lang} />
                      </button>
                    ))}
                    {payment_type === "partial" && (
                      <div className="w-100">
                        <small>
                          [আংশিক পেমেন্ট এর ক্ষেত্রে প্রোডাক্ট টোটাল এর ২৫% +
                          ডেলিভেরি চার্জ অগ্রিম পেমেন্ট করতে হবে এবং বাকি টাকা
                          ডেলিভেরির সময় প্রদান করতে হবে।]
                        </small>
                      </div>
                    )}
                  </div>
                  {payment_type === "online" && (
                    <>
                      <label className="form--label w-100 mt-4">
                        <Language
                          data={{
                            en: "Select Payment Method:",
                            bn: "পেমেন্ট এর ধরন সিলেক্ট করুনঃ",
                          }}
                        />
                      </label>
                      <div className="d-flex flex-wrap methods-container">
                        {payment_methods.map((method, index) => (
                          <button
                            type="button"
                            key={method.id}
                            className={`__payment-method no-gutter ${
                              payment_method.method === method.lang.en
                                ? "active"
                                : ""
                            }`}
                            onClick={() => {
                              setActive(index);
                              setPaymentMethod({
                                ...payment_method,
                                method: method.lang.en,
                              });
                            }}
                          >
                            <div className="d-flex align-items-center">
                              <Image
                                src={method.img}
                                alt={method.lang[language]}
                                // className="me-2"
                                width={40}
                                height={40}
                              />
                            </div>
                            <Language data={method.lang} />
                          </button>
                        ))}
                      </div>

                      <div className="mt-3"></div>
                      {active && active !== 0 ? (
                        <>
                          <div
                            className="alert alert-light mt-3 align-items-start"
                            role="alert"
                          >
                            <div className="mt-1">
                              <InfoIcon />
                            </div>
                            <div className="w-0 flex-grow-1">
                              <div>
                                {/* {language === "EN" ? (
															<>
																<strong className="text-base">
																	{
																		payment_methods[active]
																			?.lang?.en
																	}
																</strong>{" "}
																is not available for automatic
																confirmation right now. Please
																pay mannualy to{" "}
																<strong>013123456789</strong>{" "}
																and after sending money, give
																the number from which you sent
																the money or the transaction ID
																in the box below
															</>
														) : ( */}
                                <>
                                  এই মুহুর্তে{" "}
                                  <strong className="text-base">
                                    {payment_methods[active]?.lang?.bn}
                                  </strong>{" "}
                                  পেমেন্ট অটোমেটিক নেওয়া হচ্ছে না তাই দয়া করে এই
                                  নাম্বারে{" "}
                                  <strong>
                                    <span
                                      style={{ cursor: "grab" }}
                                      onClick={() => {
                                        navigator.clipboard.writeText(
                                          "01303451005"
                                        );
                                        successToast(
                                          "Number copied to clipboard!"
                                        );
                                      }}
                                      className="text-base"
                                    >
                                      01303451005
                                    </span>{" "}
                                  </strong>
                                  ম্যানুয়াল পেমেন্ট করুন এবং সেন্ড মানি করার পর
                                  নিচের বক্স এ যে নাম্বার থেকে টাকা পেমেন্ট
                                  করেছেন সেই নাম্বার অথবা ট্রাঞ্জেকসন আইডি দিন
                                </>
                                {/* )} */}
                              </div>
                              <div className="row">
                                <div className="col-xl-7">
                                  <div className="input-text-sm mt-3">
                                    <Input
                                      value={
                                        payment_method.transection_id_number
                                      }
                                      onChange={(e) => {
                                        setPaymentMethod({
                                          ...payment_method,
                                          transection_id_number: e.target.value,
                                        });
                                      }}
                                      label={convertLang({
                                        en: "ফোন নম্বর / ট্রাঞ্জেকশন আইডি",
                                        bn: "ফোন নম্বর / ট্রাঞ্জেকশন আইডি",
                                      })}
                                      placeholder={convertLang({
                                        en: "ফোন নম্বর / ট্রাঞ্জেকশন আইডি",
                                        bn: "ফোন নম্বর / ট্রাঞ্জেকশন আইডি",
                                      })}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </>
                  )}
                  <div className="mt-3"></div>
                  <div className="alert alert-light mt-3" role="alert">
                    <InfoIcon />
                    <span className="w-0 flex-grow-1">
                      <Language
                        data={{
                          en: "Please pay within 24 hours after placing order, Otherwise it will be cancelled automatically",
                          bn: "দয়া করে অর্ডার প্লেস করার ২৪ ঘন্টার মধ্যে পেমেন্ট সম্পন্ন করুন, নতুবা অর্ডার সয়ংক্রীয়ভাবে বাতিল হয়ে যাবে।",
                        }}
                      />
                    </span>
                  </div>
                </div>
                <div className="col-lg-5 col-xl-4">
                  <div className="p-3 p-sm-4 __shadow rounded">
                    <div className="">
                      <label className="form--label mb-3 fw-bold">
                        <Language
                          data={{
                            en: "Order Summary",
                            bn: "অর্ডার সারাংশ",
                          }}
                        />
                      </label>
                    </div>
                    <div className="">
                      <div>
                        <ul
                          className="cart-list cart--list"
                          style={{
                            maxHeight: "260px",
                            borderRadius: "10px",
                            border: "1px solid var(--border)",
                          }}
                        >
                          {/* {cart?.cartList?.map((item, index) => ( */}
                          {data.data.products.map((item, index) => (
                            <li key={index}>
                              <div className="cart-item">
                                <Image
                                  width={60}
                                  height={60}
                                  src={item?.img}
                                  alt="product"
                                  className="img"
                                />
                                <div className="cart-item-content">
                                  <div className="name-area m-0">
                                    <h6 className="m-0 d-block">
                                      {language === "EN"
                                        ? item?.en?.title
                                        : item.bn.title}
                                    </h6>
                                  </div>
                                  <div className="">
                                    <div className="price font-regular">
                                      {
                                        <LanguageNumber
                                          number={item?.quantity}
                                        />
                                      }{" "}
                                      <Language
                                        data={{
                                          en: "x",
                                          bn: "টি",
                                        }}
                                      />{" "}
                                      {language === "EN" && "Tk. "}
                                      <LanguageNumber
                                        number={item?.product_total}
                                      />
                                      {language === "BN" && " টাকা"}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <br />
                      <div className="product-amount-info">
                        <div className="d-flex justify-content-between border-bottom py-3">
                          <div className="text">
                            <Language
                              data={{
                                en: "Product Total:",
                                bn: "পণ্যের মোট দামঃ",
                              }}
                            />
                          </div>
                          {language === "EN" ? (
                            <div className="price">
                              Tk. {data?.data?.price_details?.subtotal}
                            </div>
                          ) : (
                            <div className="price">
                              {enToBnNumber(
                                data?.data?.price_details?.subtotal
                              )}
                              টাকা
                            </div>
                          )}
                        </div>
                        <div className="d-flex justify-content-between border-bottom py-3">
                          <div className="text">
                            <Language
                              data={{
                                en: "Delivery Charge:",
                                bn: "ডেলিভারি চার্জঃ",
                              }}
                            />
                          </div>
                          {language === "EN" ? (
                            <div className="price">
                              TK. {data?.data?.price_details?.shipping}
                            </div>
                          ) : (
                            <div className="price">
                              {enToBnNumber(
                                data?.data?.price_details?.shipping
                              )}{" "}
                              টাকা
                            </div>
                          )}
                        </div>
                        <div
                          className={`d-flex justify-content-between pt-3 ${
                            !data?.data?.price_details?.due ? "text-base" : ""
                          }`}
                        >
                          <div className="text">
                            <Language
                              data={{
                                en: "Total:",
                                bn: "সর্বমোটঃ",
                              }}
                            />
                          </div>
                          {language === "EN" ? (
                            <div className="price">
                              <strong>
                                Tk. {data?.data?.price_details?.total}
                              </strong>
                            </div>
                          ) : (
                            <div className="price">
                              <strong>
                                {enToBnNumber(data?.data?.price_details?.total)}{" "}
                                টাকা
                              </strong>
                            </div>
                          )}
                        </div>
                        {data?.data?.price_details?.due !== 0 && (
                          <div
                            className={`d-flex justify-content-between pt-3 text-base`}
                          >
                            <div className="text">
                              <Language
                                data={{
                                  en: "Pay Now:",
                                  bn: "এখন পরিশোধ করুনঃ",
                                }}
                              />
                            </div>
                            {language === "EN" ? (
                              <div className="price">
                                <strong>
                                  Tk. {data?.data?.price_details?.due}
                                </strong>
                              </div>
                            ) : (
                              <div className="price">
                                <strong>
                                  {enToBnNumber(data?.data?.price_details?.due)}
                                  টাকা
                                </strong>
                              </div>
                            )}
                          </div>
                        )}
                        {/* {data?.data?.price_details?.due !== 0 && (
                          <div
                            className={`d-flex justify-content-between pt-3`}
                          >
                            <div className="text">
                              <Language
                                data={{
                                  en: "Due:",
                                  bn: "বাকি থাকবেঃ ",
                                }}
                              />
                            </div>
                            {language === "EN" ? (
                              <div className="price">
                                <strong>
                                  Tk. {data?.data?.price_details?.due}
                                </strong>
                              </div>
                            ) : (
                              <div className="price">
                                <strong>
                                  {enToBnNumber(data?.data?.price_details?.due)}
                                  টাকা
                                </strong>
                              </div>
                            )}
                          </div>
                        )} */}
                      </div>
                      <br />
                      <div className="row">
                        <div className="col-12">
                          <button
                            /*  disabled={
                              isBkashLoading ||
                              isOtherPaymentLoading ||
                              payment_method.method === "online"
                            } */
                            disabled={
                              payment_method.method === "online" ||
                              !payment_method.method ||
                              isBkashLoading ||
                              isOtherPaymentLoading
                            }
                            onClick={handlePayment}
                            type="submit"
                            className="btn btn-base w-100 h-48"
                          >
                            <Language
                              data={{
                                en:
                                  isBkashLoading || isOtherPaymentLoading
                                    ? "Loading..."
                                    : payment_method.method === "bkash"
                                    ? "Pay Now"
                                    : "Confirm Order",
                                bn:
                                  isBkashLoading || isOtherPaymentLoading
                                    ? "লোড হচ্ছে..."
                                    : payment_method.method === "bkash"
                                    ? "পেমেন্ট করুন"
                                    : "নিশ্চিত করুন",
                              }}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </>
    );
  }
};

const payment_methods = [
  {
    id: 1,
    img: "/images/payment-methods/bkash1.png",
    lang: {
      en: "bkash",
      bn: "বিকাশ",
    },
  },
  {
    id: 2,
    img: "/images/payment-methods/rocket.png",
    lang: {
      en: "Rocket",
      bn: "রকেট",
    },
  },
  {
    id: 3,
    img: "/images/payment-methods/nagad.png",
    lang: {
      en: "Nagad",
      bn: "নগদ",
    },
  },
  {
    id: 4,
    img: "/images/payment-methods/upay.png",
    lang: {
      en: "Upay",
      bn: "উপায়",
    },
  },
  {
    id: 5,
    img: "/images/payment-methods/cellfin.png",
    lang: {
      en: "Cellfin",
      bn: "সেলফিন",
    },
  },
  /* {
		id: 6,
		img: "/images/payment-methods/bank.png",
		lang: {
			en: "Bank",
			bn: "ব্যাংক",
		},
	}, */
];

const all_payment_type = [
  {
    id: 4,
    name: "online",
    img: "/images/payment-types/online-payment.png",
    lang: {
      en: "Online Payment",
      bn: "অনলাইন পেমেন্ট",
    },
  },
  {
    id: 3,
    name: "cash",
    img: "/images/payment-types/cash-on-delivery.png",
    lang: {
      en: "Cash on Delivery",
      bn: "ক্যাশ অন ডেলিভারি",
    },
  },
  {
    id: 2,
    name: "partial",
    img: "/images/payment-types/partial-payment.png",
    lang: {
      en: "Partial Payment",
      bn: "আংশিক পেমেন্ট",
    },
  },
  {
    id: 1,
    name: "full",
    img: "/images/payment-types/full-payment.png",
    lang: {
      en: "Full Payment",
      bn: "সম্পূর্ণ পেমেন্ট",
    },
  },
];

export default PaymentPage;
