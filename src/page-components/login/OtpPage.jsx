import Language from "@/src/helper/Language";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import Input from "../../components/Input";
import { useVerifyOTPMutation } from "@/redux/slices/apiSlices/AuthApiSlice";
import { errorToast, loadingToast, successToast } from "@/utls/toasts/toast";
import { useCookies } from "react-cookie";

const OtpPage = () => {
  const [code, setCode] = useState("");
  const router = useRouter();
  const { redirect } = router.query;

  const [cookies, setCookies, removeCookie] = useCookies(["user"]);
  const [verifyOTPFunc, { isLoading, isError, error, isSuccess, data, reset }] =
    useVerifyOTPMutation();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.toString().length !== 6) {
      return errorToast(
        <Language data={{ en: "Invalid OTP Code!", bn: "ভুল ওটিপি কোড!" }} />
      );
    }
    verifyOTPFunc({ otp: parseInt(code), token: cookies?.token });
  };
  const cart = useSelector((state) => state.cart)?.cartList;
  // Language Change Function
  const language = useSelector((state) => state.language.language);
  const convertLang = (data) => {
    if (language === "BN") {
      return data.bn;
    } else {
      return data.en;
    }
  };

  //Interactions with API response
  if (isError) {
    if (
      error.data.message ===
      "Unexpected server issue, Please contact us with your problem"
    ) {
      errorToast(
        <Language
          data={{
            en: "Unexpected server issue, Please try with your other phone number",
            bn: "অপ্রত্যাশিত সার্ভার সমস্যা, অন্য ফোন নম্বর দিয়ে চেষ্টা করুন",
          }}
        />
      );
    } else {
      errorToast(
        <Language
          data={{
            en: "OTP is incorrect or expired! Please try again later",
            bn: "ওটিপি ভুল বা মেয়াদ শেষ! দয়া করে পরে আবার চেষ্টা করুন",
          }}
        />
      );
    }

    reset();
  }
  if (isLoading) {
    loadingToast(
      <Language
        data={{
          en: "Verifying OTP..",
          bn: "ওটিপি যাচাই করা হচ্ছে..",
        }}
      />
    );
  }
  if (isSuccess) {
    successToast(
      <Language
        data={{
          en: "OTP verified successfully.",
          bn: "ওটিপি সফলভাবে যাচাই করা হয়েছে।",
        }}
      />
    );
    setCookies("login_token", data.token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3000),
    });
    if (cart?.length && redirect) {
      router.push(`/${redirect}`);
    } else {
      router.push(`/dashboard`);
    }
    removeCookie("token");
    reset();
  }

  return (
    <>
      <div className="py-5">
        <div className="container py-md-5">
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-inner">
              <div className="text-center">
                <h4 className="title">
                  <Language
                    data={{
                      en: "Submit Your OTP",
                      bn: "ওটিপি সাবমিট করুন",
                    }}
                  />
                </h4>
                <p>
                  <Language
                    data={{
                      en: "Please enter the 6 Digit OTP code sent to your phone number",
                      bn: "আপনার ফোন নম্বরে পাঠানো ৬ ডিজিট এর ওটিপি কোডটি লিখুন",
                    }}
                  />
                </p>
              </div>
              <div className="row g-4">
                <div className="col-12">
                  <Input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    label={convertLang({
                      en: "OTP Code",
                      bn: "ওটিপি কোড",
                    })}
                    placeholder={convertLang({
                      en: "Enter Code Here",
                      bn: "কোড এখানে লিখুন",
                    })}
                  />
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-base w-100">
                    {isLoading ? (
                      <Language
                        data={{
                          en: "Verifying OTP..",
                          bn: "ওটিপি যাচাই করা হচ্ছে..",
                        }}
                      />
                    ) : (
                      <Language
                        data={{
                          en: "Login",
                          bn: "লগইন",
                        }}
                      />
                    )}
                  </button>
                  <div className="text-end mt-3">
                    <button
                      onClick={() => router.push("/login")}
                      className="text-base no-gutter"
                      type="button"
                    >
                      <Language
                        data={{
                          en: "Resend Code",
                          bn: "কোড পুনরায় পাঠান",
                        }}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default OtpPage;
