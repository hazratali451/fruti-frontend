/* eslint-disable react-hooks/exhaustive-deps */
import {
  setCartSidebarOpen,
  setDecrementQty,
  setDeliveryCharge,
  setIncrementQty,
  setRemoveFromCart,
} from "@/redux/slices/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Language from "../helper/Language";
import LanguageNumber from "../helper/LanguageNumber";
import { ClearIcon, TrashIcon } from "./Icon";
const CartSidebar = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  console.log();
  const language = useSelector((state) => state.language.language);
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(setCartSidebarOpen(false));
    setLoading(false);
  }, []);
  useEffect(() => {
    dispatch(setDeliveryCharge(80));
  }, [cart?.cartSidebarOpen, cart?.cartTotalAmount]);
  if (loading) {
    return;
  }
  return (
    <>
      <div
        className={`cart-sidebar ${
          cart?.cartSidebarOpen === "true" ? "active" : ""
        }`}
      >
        {cart?.cartList?.length > 0 ? (
          <div className="cart-sidebar-inner d-flex flex-column">
            <h6 className="border-bottom d-flex justify-content-between align-items-center pb-3">
              <span>
                <Language data={{ en: "My Cart", bn: "আমার ব্যাগ" }} />
              </span>
              <button
                className="no-gutter text-danger"
                onClick={() => {
                  dispatch(setCartSidebarOpen(false));
                }}
              >
                <ClearIcon width={24} />
              </button>
            </h6>
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              <ul className="cart-list">
                {cart?.cartList?.map((item, index) => (
                  <li key={index}>
                    <div className="cart-item">
                      <Image
                        width={70}
                        height={70}
                        src={item?.img}
                        alt="product"
                        className="img"
                      />
                      <div className="cart-item-content">
                        <div className="name-area">
                          <h6>
                            {
                              <Language
                                data={{
                                  en: item?.en?.title,
                                  bn: item?.bn?.title,
                                }}
                              />
                            }
                          </h6>
                          <button
                            type="button"
                            className="trash no-gutter"
                            onClick={() => dispatch(setRemoveFromCart(item))}
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
                              onClick={() => dispatch(setIncrementQty(item))}
                            >
                              +
                            </button>
                          </div>
                          <div className="price">
                            {language === "EN" && "Tk. "}
                            <LanguageNumber
                              number={item.sale_price * item.qty}
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
            <div className="cart-total-area bg-white pt-4 mt-auto">
              <div className="d-flex justify-content-between">
                <span>
                  <Language data={{ en: "Sub Total:", bn: "মোটঃ" }} />
                </span>
                <span>
                  {language === "EN" && "Tk."}{" "}
                  <LanguageNumber
                    number={cart?.cartTotalAmount - cart?.deliveryCharge}
                  />
                  {language === "BN" && " টাকা"}{" "}
                </span>
              </div>
              <div className="d-flex justify-content-between">
                <span>
                  <Language
                    data={{
                      en: "Delivery Charge:",
                      bn: "ডেলিভেরি চার্জঃ",
                    }}
                  />
                </span>
                <span>
                  {language === "EN" && "Tk."}{" "}
                  <LanguageNumber number={cart?.deliveryCharge} />
                  {language === "BN" && " টাকা"}{" "}
                </span>
              </div>
              <div className="d-flex justify-content-between">
                <span>
                  <Language data={{ en: "Total:", bn: "সর্বমোটঃ" }} />
                </span>
                <span>
                  {language === "EN" && "Tk."}{" "}
                  <LanguageNumber number={cart?.cartTotalAmount} />
                  {language === "BN" && " টাকা"}{" "}
                </span>
              </div>
              <Link
                href={user ? "/checkout" : "/login-confirmation"}
                className="btn w-100 btn-base mt-4"
              >
                <Language data={{ en: "Checkout", bn: "অর্ডার করুন" }} />
              </Link>
            </div>
          </div>
        ) : (
          <div className="cart-sidebar-inner">
            <div className="text-end">
              <button
                className="no-gutter text-danger"
                onClick={() => {
                  dispatch(setCartSidebarOpen(false));
                }}
              >
                <ClearIcon width={24} />
              </button>
            </div>
            <div className="empty-cart text-center">
              <Image
                width={100}
                height={100}
                src="/images/empty-cart.png"
                alt="empty-cart"
              />
              <h5 className="mt-4 pb-3">
                <Language
                  data={{
                    en: "Your cart is empty",
                    bn: "আপনার ব্যাগ খালি",
                  }}
                />
              </h5>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
