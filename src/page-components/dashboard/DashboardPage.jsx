/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useGetOrdersQuery } from "@/redux/slices/apiSlices/OrderApiSlice";
import Layout from "@/src/components/Layout";
import useScreen from "@/src/components/useScreen";
import Language from "@/src/helper/Language";
import enToBnNumber from "@/utls/Language/entoBnNumber";
import Loader from "@/utls/Loader/Loader";
import { errorToast } from "@/utls/toasts/toast";
import Image from "next/image";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import DashboardLayout from "./components/DashboardLayout";

const DashboardPage = () => {
  const [cookies] = useCookies(["user"]);
  const { isError, isLoading, isSuccess, data } = useGetOrdersQuery(
    cookies?.login_token
  );
  const language = useSelector((state) => state.language).language;
  const screen = useScreen();
  if (isLoading)
    return (
      <Layout>
        <Loader />{" "}
      </Layout>
    );

  if (isError) {
    errorToast("Something went wrong while fatching. Please try again later.");
  }

  if (isError || !data.data.length)
    return (
      <Layout>
        <div className="container py-5">
          <div className="text-center py-5">
            <Image
              width={120}
              height={120}
              // src="/images/not-found.png"
              src="/images/error.png"
              alt=""
              className="mb-4"
            />
            <h1 className="text-danger h1 mb-4">No Order Found</h1>
            <p className="text-muted m-0">You have not placed any order yet.</p>
          </div>
        </div>
      </Layout>
    );
  if (isSuccess && data.data.length) {
    return (
      <DashboardLayout>
        <div className="container py-xl-5">
          {/* Order List */}
          <h5 className="mb-4">Order List</h5>

          <div id="dashboard_order_list" className="my-5">
            {data?.data?.map((dt, i) => (
              <div key={i} className="dashboard_order_wrapper  my-md-5 my-4">
                <div className="  order_item">
                  <div>
                    <h5>
                      <Language
                        data={{
                          en: "Order ID",
                          bn: "অর্ডার আইডি",
                        }}
                      />
                    </h5>
                    <Link href={``} className="text-base">
                      #
                      {language === "EN"
                        ? dt?.order_number
                        : enToBnNumber(dt?.order_number)}
                    </Link>
                  </div>

                  <div>
                    <h5>
                      <Language
                        data={{
                          en: "Customer Name",
                          bn: "কাস্টমারের নাম",
                        }}
                      />
                    </h5>

                    <p>{dt?.customer_details?.name}</p>
                  </div>

                  <div>
                    <h5>
                      <Language
                        data={{
                          en: "Total Price",
                          bn: "মোট মূল্য",
                        }}
                      />
                    </h5>
                    <p>
                      {language === "EN" && (
                        <>
                          <Language
                            data={{
                              en: "TK",
                              bn: "টাকা",
                            }}
                          />
                          .{" "}
                        </>
                      )}

                      {language === "EN"
                        ? dt?.price_details?.total
                        : enToBnNumber(dt?.price_details?.total)}
                      {language !== "EN" && (
                        <>
                          {" "}
                          <Language
                            data={{
                              en: "TK",
                              bn: "টাকা",
                            }}
                          />
                        </>
                      )}
                    </p>
                  </div>
                  <div>
                    <h5>
                      <Language
                        data={{
                          en: "Date",
                          bn: "তারিখ",
                        }}
                      />
                    </h5>
                    <p>
                      {" "}
                      {language === "EN"
                        ? new Date(dt.createdAt).toLocaleString("en-GB")
                        : new Date(dt.createdAt).toLocaleString("bn-BD")}
                    </p>
                  </div>

                  <div>
                    <h5>
                      <Language
                        data={{
                          en: "Status",
                          bn: "স্ট্যাটাস",
                        }}
                      />
                    </h5>
                    <span
                      className="badge"
                      style={{
                        background: `${
                          dt?.status === "unpaid"
                            ? "#FF8A08"
                            : dt?.status === "cancelled"
                            ? "red"
                            : "var(--base)"
                        } `,
                      }}
                    >
                      <Language data={getStatusTranslation(dt?.status)} />
                    </span>
                  </div>

                  <div>
                    <h5>
                      <Language
                        data={{
                          en: "Action",
                          bn: "অ্যাকশান",
                        }}
                      />
                    </h5>
                    {dt?.status === "unpaid" ? (
                      <Link
                        href={`/checkout/payment?order=${dt?.order_number}`}
                        className="badge border-0  "
                        style={{ background: "#844226" }}
                      >
                        <Language
                          data={{
                            bn: "পেমেন্ট করুন",
                            en: "Pay Now",
                          }}
                        />
                      </Link>
                    ) : dt?.status === "cancelled" ? (
                      <Link
                        href={"/contact-us"}
                        className="badge border-0  "
                        style={{ background: "var(--base)" }}
                      >
                        <Language
                          data={{
                            bn: "যোগাযোগ করুন",
                            en: "Contact Us",
                          }}
                        />
                      </Link>
                    ) : (
                      <Link
                        href={""}
                        className="badge border-0  "
                        style={{ background: "var(--base)" }}
                      >
                        <Language
                          data={{
                            bn: "ইনভয়েস ডাউনলোড",
                            en: "Download Invoice",
                          }}
                        />
                      </Link>
                    )}
                  </div>
                </div>

                <div className="mt-3 ">
                  <table className="table pt-4 mb-0 products_table">
                    <thead>
                      <tr>
                        <th>
                          <Language
                            data={{
                              en: "Product Name",
                              bn: "পণ্যের নাম",
                            }}
                          />
                        </th>

                        <th>
                          <Language
                            data={{
                              en: "Price",
                              bn: "মূল্য",
                            }}
                          />
                        </th>
                        <th>
                          <Language
                            data={{
                              en: "Quantity",
                              bn: "পরিমাণ",
                            }}
                          />
                        </th>
                        <th>
                          <Language
                            data={{
                              en: "Total Price",
                              bn: "মোট মূল্য",
                            }}
                          />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dt?.products?.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <Link
                              href="#"
                              className="text-body d-flex align-items-center gap-2"
                            >
                              <img
                                src={item?.img}
                                alt={`${
                                  language === "EN"
                                    ? item?.en?.title
                                    : item?.bn?.title
                                }`}
                                className="img-fluid"
                                width="60"
                              />
                              <span className="ms-2">
                                <Language
                                  data={{
                                    en: item?.en?.title,
                                    bn: item?.bn?.title,
                                  }}
                                />
                              </span>
                            </Link>
                          </td>

                          <td>
                            {language === "EN" && (
                              <>
                                <Language
                                  data={{
                                    en: "TK",
                                    bn: "টাকা",
                                  }}
                                />
                                .{" "}
                              </>
                            )}
                            {language === "EN"
                              ? item?.price
                              : enToBnNumber(item?.price)}{" "}
                            {language !== "EN" && (
                              <>
                                <Language
                                  data={{
                                    en: "TK",
                                    bn: "টাকা",
                                  }}
                                />
                              </>
                            )}
                          </td>
                          <td>
                            {" "}
                            {language === "EN"
                              ? item?.quantity
                              : enToBnNumber(item?.quantity)}
                          </td>
                          <td>
                            {language === "EN" && (
                              <>
                                <Language
                                  data={{
                                    en: "TK",
                                    bn: "টাকা",
                                  }}
                                />
                                .{" "}
                              </>
                            )}
                            {language === "EN"
                              ? item?.price * item?.quantity
                              : enToBnNumber(item?.price * item?.quantity)}
                            {language !== "EN" && (
                              <>
                                {" "}
                                <Language
                                  data={{
                                    en: "TK",
                                    bn: "টাকা",
                                  }}
                                />
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* mobile-device-grid-system */}
                  <div className="sm-device-card-wrapper">
                    {dt?.products?.map((item, index) => (
                      <div key={index} className="card-item">
                        <div className="mb-2">
                          <Link
                            href="#"
                            className="text-body d-flex align-items-center gap-2"
                          >
                            <img
                              src={item?.img}
                              alt={`${
                                language === "EN"
                                  ? item?.en?.title
                                  : item?.bn?.title
                              }`}
                              className="img-fluid"
                              width="60"
                            />
                            <span className="ms-2">
                              <Language
                                data={{
                                  en: item?.en?.title,
                                  bn: item?.bn?.title,
                                }}
                              />
                            </span>
                          </Link>
                        </div>

                        <div className="d-flex justify-content-between items-center">
                          <h5>
                            <Language
                              data={{
                                en: "Price",
                                bn: "মূল্য",
                              }}
                            />
                          </h5>
                          <div>
                            {language === "EN" && (
                              <>
                                <Language
                                  data={{
                                    en: "TK",
                                    bn: "টাকা",
                                  }}
                                />
                                .{" "}
                              </>
                            )}
                            {language === "EN"
                              ? item?.price
                              : enToBnNumber(item?.price)}{" "}
                            {language !== "EN" && (
                              <>
                                <Language
                                  data={{
                                    en: "TK",
                                    bn: "টাকা",
                                  }}
                                />
                              </>
                            )}
                          </div>
                        </div>
                        <div className="d-flex justify-content-between items-center">
                          <h5>
                            <Language
                              data={{
                                en: "Quantity",
                                bn: "পরিমাণ",
                              }}
                            />
                          </h5>
                          <div>
                            {" "}
                            {language === "EN"
                              ? item?.quantity
                              : enToBnNumber(item?.quantity)}
                          </div>
                        </div>
                        <div className="d-flex justify-content-between items-center">
                          <h5>
                            <Language
                              data={{
                                en: "Total Price",
                                bn: "মোট মূল্য",
                              }}
                            />
                          </h5>
                          <div>
                            {language === "EN" && (
                              <>
                                <Language
                                  data={{
                                    en: "TK",
                                    bn: "টাকা",
                                  }}
                                />
                                .{" "}
                              </>
                            )}
                            {language === "EN"
                              ? item?.price * item?.quantity
                              : enToBnNumber(item?.price * item?.quantity)}
                            {language !== "EN" && (
                              <>
                                {" "}
                                <Language
                                  data={{
                                    en: "TK",
                                    bn: "টাকা",
                                  }}
                                />
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }
};

export default DashboardPage;

const statusTranslations = {
  paid: { en: "Paid", bn: "পরিশোধিত" },
  unpaid: { en: "Unpaid", bn: "অপরিশোধিত" },
  ongoing: { en: "Ongoing", bn: "চলমান" },
  pending: { en: "Pending", bn: "পেন্ডিং" },
  processing: { en: "Processing", bn: "প্রক্রিয়াধীন" },
  shipped: { en: "Shipped", bn: "শিপড" },
  delivered: { en: "Delivered", bn: "ডেলিভার্ড" },
  cancelled: { en: "Cancelled", bn: "বাতিল" },
  refunded: { en: "Refunded", bn: "ফেরত" },
};
const getStatusTranslation = (status) => {
  const translatedStatus = statusTranslations[status.toLowerCase()];
  return translatedStatus ? translatedStatus : { en: status, bn: status };
};
