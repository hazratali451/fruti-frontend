/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useCreateOrderMutation } from "@/redux/slices/apiSlices/OrderApiSlice";
import {
  setCartSidebarOpen,
  setDecrementQty,
  setIncrementQty,
  setRemoveAllFromCart,
  setRemoveFromCart,
} from "@/redux/slices/cartSlice";
import { TrashIcon } from "@/src/components/Icon";
import Input from "@/src/components/Input";
import Layout from "@/src/components/Layout";
import Language from "@/src/helper/Language";
import LanguageNumber from "@/src/helper/LanguageNumber";
import enToBnNumber from "@/utls/Language/entoBnNumber";
import { errorToast, successToast } from "@/utls/toasts/toast";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { Stepper } from "./AccountPage";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
const CityOptionEnglish = [
  { value: "Dhaka Metropolitan", label: "Dhaka Metropolitan" },
];
const CityOptionBangla = [
  { value: "ঢাকা মেট্রোপলিটন", label: "ঢাকা মেট্রপলিটন" },
];

const CheckoutPage = () => {
  const [addressData, setJsonData] = useState([]);
  // Language Change Function
  const language = useSelector((state) => state.language.language);
  const convertLang = (data) => {
    if (language === "BN") {
      return data.bn;
    } else {
      return data.en;
    }
  };
  const [checkoutInfo, setCheckoutInfo] = useState({
    name: "",
    phone_number: "",
    district: "Dhaka",
    city:
      language === "EN"
        ? CityOptionEnglish[0].label
        : CityOptionBangla[0].label,
    area_postal: "",
    detailed_address: "",
    google_map: "",
    payment_type: "full",
  });
  const [createOrderFunc, { isError, isLoading, isSuccess, reset, data }] =
    useCreateOrderMutation();

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user).user;
  const router = useRouter();
  useEffect(() => {
    dispatch(setCartSidebarOpen(false));
  }, []);

  useEffect(() => {
    if (user?.delivery_info) {
      if (user.delivery_info.phone_number) {
        setCheckoutInfo({
          ...checkoutInfo,
          name: user.delivery_info.name,
          phone_number: user.delivery_info.phone_number.toString().slice(2, 13),
          district: user.delivery_info.district,
          city: user.delivery_info.city,
          area_postal: user.delivery_info.area_postal,
          detailed_address: user.delivery_info.detailed_address,
          google_map: user.delivery_info.google_map,
        });
      }
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //error handling for phone number with regx
    if (checkoutInfo.phone_number.length !== 11) {
      errorToast(
        language === "EN"
          ? "Enter you 11 digit phone number"
          : "আপনার ১১ ডিজিট এর ফোন নাম্বার দিন"
      );
      return;
    }
    if (!checkoutInfo.area_postal) {
      errorToast(
        language === "EN"
          ? "Select your area/postal code"
          : "আপনার এরিয়া/পোস্টাল কোড সিলেক্ট করুন"
      );
      return;
    }

    /*  if (checkoutInfo.payment_method !== "bkash") {
      errorToast(
        language === "EN"
          ? "Only Bkash payment method is available now, Please select Bkash for now, Other payment methods will be available soon."
          : "এই মুহুর্তে শুধুমাত্র বিকাশ পেমেন্ট এর সুবিধা রয়েছে, অনুগ্রহ করে বিকাশ সিলেক্ট করুন, অন্যান্য পেমেন্ট মেথড শীঘ্রই উপলব্ধ হবে।"
      );
      return;
    } */
    //check if payment type selected
    if (checkoutInfo.payment_type === "") {
      errorToast(
        language === "EN"
          ? "Select a payment type"
          : "পেমেন্ট এর ধরন সিলেক্ট করুন"
      );
      return;
    }
    try {
      createOrderFunc({
        products: cart.cartList.map((item) => ({
          product_id: item._id,
          quantity: item.qty,
        })),
        address: {
          destrict: checkoutInfo.district,
          city: checkoutInfo.city,
          area_postal: checkoutInfo.area_postal,
          detailed_address: checkoutInfo.detailed_address,
          google_map: checkoutInfo.google_map,
        },
        customer_details: {
          name: checkoutInfo.name,
          phone_number: checkoutInfo.phone_number,
          _id: user?._id,
        },
        payment_type: checkoutInfo.payment_type,
        payment_method: checkoutInfo.payment_method,
        delivery_type: "home_delivery",
        price_details: {
          total: cart.cartTotalAmount,
        },
      });
    } catch {
      errorToast(
        language === "EN" ? "Something went wrong" : "কিছু ভুল হয়েছে"
      );
    }
  };

  //loading, success, error toast
  if (isLoading) {
    /* //loadingToast(language === "EN" ? "Loading..." : "লোড হচ্ছে..."); */
    /*  return <Loader />; */
  }
  if (isSuccess) {
    //clear cart
    successToast(
      language === "EN" ? "Order Placed Successfully" : "অর্ডার সম্পন্ন হয়েছে!"
    );

    //remove all cart items
    if (data?.data?.order_number) {
      router.push(`/checkout/payment?order=${data.data.order_number}`);
    }
    reset();

    setTimeout(() => {
      dispatch(setRemoveAllFromCart());
    }, 2000);
  }
  if (isError) {
    errorToast("Something went wrong");
    reset();
  }

  //load json data from "public/EngAddr.json" file

  useEffect(() => {
    fetch("/addr.json")
      .then((res) => res.json())
      .then((data) => {
        //transform all the text to capitalize like from "new market" to "New Market"
        data.english = data.english.map((item) => ({
          value: item.value,
          label: item.label
            .split(" ")
            .map((word) => word[0].toUpperCase() + word.slice(1))
            .join(" "),
        }));
        setJsonData(data);
      });
  }, []);

  return (
    <Layout>
      <div className="py-5">
        <div className="container">
          <Stepper step={"checkout"} />
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="row g-4">
              <div className="col-lg-7 col-xl-8">
                <div className="row g-4">
                  <div className="col-sm-6">
                    <Input
                      required={true}
                      type={"text"}
                      value={checkoutInfo.name}
                      onChange={(e) =>
                        setCheckoutInfo({
                          ...checkoutInfo,
                          name: e.target.value,
                        })
                      }
                      label={convertLang({
                        en: "Your Name:",
                        bn: "আপনার নামঃ",
                      })}
                      placeholder={convertLang({
                        en: "Ex : Md. Hazrat Ali",
                        bn: "যেমনঃ হযরত আলী",
                      })}
                    />
                  </div>
                  <div className="col-sm-6">
                    <Input
                      required={true}
                      type={"number"}
                      value={checkoutInfo.phone_number}
                      onChange={(e) =>
                        setCheckoutInfo({
                          ...checkoutInfo,
                          phone_number: e.target.value,
                        })
                      }
                      label={convertLang({
                        en: "Phone Number:",
                        bn: "মোবাইল নাম্বারঃ",
                      })}
                      placeholder={convertLang({
                        en: "Ex : 01703123456",
                        bn: "যেমনঃ ০১৭০৩১২৩৪৫৬",
                      })}
                    />
                  </div>
                  <div className="col-sm-6">
                    <Input
                      required={true}
                      type={"text"}
                      value={language === "EN" ? "Dhaka" : "ঢাকা"}
                      disabled
                      onChange={(e) =>
                        setCheckoutInfo({
                          ...checkoutInfo,
                          district: e.target.value,
                        })
                      }
                      label={convertLang({
                        en: "District:",
                        bn: "জেলাঃ",
                      })}
                      placeholder="Ex : Dhaka"
                    />
                  </div>

                  <div className="col-sm-6">
                    <label className="form-label form--label">
                      {convertLang({
                        en: "City",
                        bn: "শহরঃ",
                      })}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    {language === "EN" ? (
                      <>
                        <Select
                          classNamePrefix="select"
                          defaultValue={CityOptionEnglish[0]}
                          isClearable={false}
                          isSearchable={false}
                          name="city"
                          options={
                            language === "EN"
                              ? CityOptionEnglish
                              : CityOptionBangla
                          }
                          onChange={(e) =>
                            setCheckoutInfo({
                              ...checkoutInfo,
                              city: e.value,
                            })
                          }
                          placeholder={convertLang({
                            en: "City:",
                            bn: "শহরঃ",
                          })}
                        />
                      </>
                    ) : (
                      <Select
                        classNamePrefix="select"
                        defaultValue={CityOptionBangla[0]}
                        isClearable={false}
                        isSearchable={false}
                        name="city"
                        options={
                          language === "EN"
                            ? CityOptionEnglish
                            : CityOptionBangla
                        }
                        onChange={(e) =>
                          setCheckoutInfo({
                            ...checkoutInfo,
                            city: e.value,
                          })
                        }
                        placeholder={convertLang({
                          en: "City:",
                          bn: "শহরঃ",
                        })}
                      />
                    )}
                  </div>

                  <div className="col-sm-6">
                    <label className="form-label form--label">
                      {convertLang({
                        en: "Area / Postal Code:",
                        bn: "এরিয়া / পোস্টাল কোডঃ",
                      })}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <Select
                      classNamePrefix="select"
                      defaultValue={checkoutInfo.area_postal}
                      isClearable={false}
                      isSearchable={true}
                      name="area_postal"
                      options={
                        language === "EN"
                          ? addressData.english
                          : addressData.bangla
                      }
                      onChange={(e) =>
                        setCheckoutInfo({
                          ...checkoutInfo,
                          area_postal: e.value,
                        })
                      }
                      placeholder={convertLang({
                        en: "Select Area / Postal Code",
                        bn: "এরিয়া / পোস্টাল কোড সিলেক্ট করুন",
                      })}
                    />
                  </div>
                  <div className="col-sm-12">
                    <Input
                      required={true}
                      type={"text"}
                      value={checkoutInfo.detailed_address}
                      onChange={(e) =>
                        setCheckoutInfo({
                          ...checkoutInfo,
                          detailed_address: e.target.value,
                        })
                      }
                      label={convertLang({
                        en: "Detailed Address:",
                        bn: "বিস্তারিত ঠিকানাঃ",
                      })}
                      placeholder={
                        language === "EN"
                          ? "Ex : House # 12, Road # 12, Mirpur 12"
                          : "যেমনঃ বাসা # ১২, রোড # ১২, মিরপুর ১২"
                      }
                      textarea
                    />
                  </div>
                  <div className="col-sm-12">
                    <Input
                      type={"text"}
                      value={checkoutInfo.google_map}
                      onChange={(e) =>
                        setCheckoutInfo({
                          ...checkoutInfo,
                          google_map: e.target.value,
                        })
                      }
                      label={convertLang({
                        en: "Google Map Link:(optional)",
                        bn: "গুগল ম্যাপ লিংকঃ (ঐচ্ছিক)",
                      })}
                      required={false}
                      placeholder="https://maps.app.goo.gl/VjJYKzc3fBQYbJB8A"
                    />
                  </div>
                  {/*      <div className="col-sm-12">
                    <label className="form--label mb-3">
                      <Language
                        data={{
                          en: "Payment Method:",
                          bn: "পেমেন্ট এর মাধ্যমঃ",
                        }}
                      />
                    </label>
                    <div className="d-flex flex-wrap gap-3">
                      {payment_methods?.map((method) => (
                        <label className="checkbox-item" key={method.id}>
                          <input
                            type="radio"
                            className="d-none"
                            name="payment-method"
                            value={method.name}
                            checked={
                              checkoutInfo.payment_method === method.name
                            }
                            onChange={(e) =>
                              setCheckoutInfo({
                                ...checkoutInfo,
                                payment_method: e.target.value,
                              })
                            }
                          />
                          <div className="payment-method">
                            <img src={method.image} alt={method.name} />
                          </div>
                        </label>
                      ))}
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="col-lg-5 col-xl-4">
                <label className="form--label">
                  <Language
                    data={{
                      en: "Order Summary",
                      bn: "অর্ডার সারাংশ",
                    }}
                  />
                </label>
                <div
                  style={{
                    maxHeight: "360px",
                    overflowY: "auto",
                    borderRadius: "10px",
                    border: "1px solid var(--border)",
                  }}
                >
                  <ul className="cart-list cart--list">
                    {cart?.cartList?.map((item, index) => (
                      <li key={index}>
                        <div className="cart-item">
                          <Image
                            width={60}
                            height={60}
                            src={item.img}
                            alt="product"
                            className="img"
                          />
                          <div className="cart-item-content">
                            <div className="name-area">
                              <h6>
                                {language === "EN"
                                  ? item?.en?.title
                                  : item.bn.title}
                              </h6>
                              <button
                                type="button"
                                className="trash no-gutter"
                                onClick={() =>
                                  dispatch(setRemoveFromCart(item))
                                }
                              >
                                <TrashIcon />
                              </button>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                              {/* Quantity Buttons */}
                              <div className="quantity-btn">
                                <button
                                  type="button"
                                  className="btn btn-outline-base"
                                  onClick={() =>
                                    dispatch(
                                      item.qty > 1
                                        ? setDecrementQty(item)
                                        : setRemoveFromCart(item)
                                    )
                                  }
                                >
                                  -
                                </button>
                                <span className="quantity">
                                  <LanguageNumber number={item.qty} />
                                </span>
                                <button
                                  type="button"
                                  className="btn btn-outline-base"
                                  onClick={() =>
                                    dispatch(setIncrementQty(item))
                                  }
                                >
                                  +
                                </button>
                              </div>
                              <div className="price">
                                {language === "EN" && "Tk. "}
                                <LanguageNumber number={item.sale_price} />
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
                        Tk. {cart?.cartTotalAmount - cart.deliveryCharge}
                      </div>
                    ) : (
                      <div className="price">
                        {enToBnNumber(
                          cart?.cartTotalAmount - cart.deliveryCharge
                        )}{" "}
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
                      <div className="price">TK. {cart?.deliveryCharge}</div>
                    ) : (
                      <div className="price">
                        {enToBnNumber(cart?.deliveryCharge)} টাকা
                      </div>
                    )}
                  </div>
                  <div
                    className={`d-flex justify-content-between pt-3 ${
                      checkoutInfo.payment_type === "full" ? "text-base" : ""
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
                        <strong>Tk. {cart?.cartTotalAmount}</strong>
                      </div>
                    ) : (
                      <div className="price">
                        <strong>
                          {enToBnNumber(cart?.cartTotalAmount)} টাকা
                        </strong>
                      </div>
                    )}
                  </div>
                  {
                    //partial payment info
                    checkoutInfo.payment_type === "partial" && (
                      <div className="d-flex justify-content-between pt-3 text-base">
                        <div className="text">
                          <Language
                            data={{
                              en: "Payable Now:",
                              bn: "এখন পরিশোধ করুনঃ",
                            }}
                          />
                        </div>
                        {language === "EN" ? (
                          <div className="price">
                            <strong>
                              Tk.{" "}
                              {Math.ceil(
                                (cart?.cartTotalAmount - cart.deliveryCharge) *
                                  0.25 +
                                  cart.deliveryCharge
                              )}
                            </strong>
                          </div>
                        ) : (
                          <div className="price">
                            <strong>
                              {enToBnNumber(
                                Math.ceil(
                                  (cart?.cartTotalAmount -
                                    cart.deliveryCharge) *
                                    0.25 +
                                    cart.deliveryCharge
                                )
                              )}{" "}
                              টাকা
                            </strong>
                          </div>
                        )}
                      </div>
                    )
                  }
                  {
                    //Due payment info
                    checkoutInfo.payment_type === "partial" && (
                      <div className="d-flex justify-content-between pt-3">
                        <div className="text">
                          <Language
                            data={{
                              en: "Due on Delivery:",
                              bn: "ডেলিভারির সময় পরিশোধ করুনঃ",
                            }}
                          />
                        </div>
                        {language === "EN" ? (
                          <div className="price">
                            <strong>
                              Tk.{" "}
                              {Math.floor(
                                (cart?.cartTotalAmount - cart.deliveryCharge) *
                                  0.75
                              )}
                            </strong>
                          </div>
                        ) : (
                          <div className="price">
                            <strong>
                              {enToBnNumber(
                                Math.floor(
                                  (cart?.cartTotalAmount -
                                    cart.deliveryCharge) *
                                    0.75
                                )
                              )}
                              টাকা
                            </strong>
                          </div>
                        )}
                      </div>
                    )
                  }
                </div>
                <br />
                <div className="row g-3">
                  {/* <div className="col-12">
										<div className="position-relative">
											<Input
												type={"text"}
												value={checkoutInfo.coupon}
												onChange={(e) =>
													setCheckoutInfo({
														...checkoutInfo,
														coupon: e.target.value,
													})
												}
												label={convertLang({
													en: "Have any coupon ? (optional)",
													bn: "কোনো কুপন আছে ? (ঐচ্ছিক)",
												})}
												required={false}
												placeholder={
													language === "EN"
														? "Enter Coupon Code"
														: "কুপন কোড দিন"
												}
											/>
											<button
												type="button"
												className="coupon-apply-btn"
											>
												<Language
													data={{
														en: "Apply Coupon",
														bn: "প্রয়োগ করুন",
													}}
												/>
											</button>
										</div>
									</div>
									<div className="col-12">
										<div className="or">
											<Language
												data={{
													en: "OR",
													bn: "অথবা",
												}}
											/>
										</div>
									</div> */}
                  <div className="col-12">
                    <button
                      disabled={isLoading}
                      type="submit"
                      className="btn btn-base w-100 h-48"
                    >
                      {isLoading ? (
                        <Language
                          data={{
                            en: "Placing Order...",
                            bn: "অর্ডার করা হচ্ছে...",
                          }}
                        />
                      ) : (
                        <Language
                          data={{
                            en: "Place Order",
                            bn: "অর্ডার করুন",
                          }}
                        />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

const payment_methods = [
  {
    id: 1,
    name: "bkash",
    image: "/images/payment-methods/bkash.png",
  },

  {
    id: 3,
    name: "Others",
    image: "/images/payment-methods/others.png",
  },
];

export default CheckoutPage;
