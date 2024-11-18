import { useSendOTPMutation } from "@/redux/slices/apiSlices/AuthApiSlice";
import Input from "@/src/components/Input";
import Layout from "@/src/components/Layout";
import Language from "@/src/helper/Language";
import enToBnNumber from "@/utls/Language/entoBnNumber";
import { errorToast, loadingToast, successToast } from "@/utls/toasts/toast";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const LoginPage = () => {
  const [phone, setPhone] = useState("+880");
  const router = useRouter();
  const [cookies, setCookies] = useCookies(["user"]);
  const { redirect } = router.query;

  const [sendOTPFunc, { isError, isLoading, isSuccess, data, reset }] =
    useSendOTPMutation();

  const handleSubmit = (e) => {
    e.preventDefault();

    const bdPhoneRegex = /^(\+)?(88)?01[0-9]{9}$/;
    let formattedPhone = phone;
    if (!phone.startsWith("+")) {
      formattedPhone = "+88" + phone;
    } else if (!phone.startsWith("+88")) {
      formattedPhone = phone.replace("+", "+88");
    }
    if (bdPhoneRegex.test(formattedPhone)) {
      setPhone(formattedPhone);
      sendOTPFunc(formattedPhone);
    } else {
      return toast.error("Invalid Phone Number", { id: "error" });
    }
  };
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
    errorToast(
      <Language
        data={{
          en: "Something went wrong! Please try again later",
          bn: "কিছু ভুল হয়েছে! দয়া করে পরে আবার চেষ্টা করুন",
        }}
      />
    );
    reset();
  }
  if (isLoading) {
    loadingToast(
      <Language
        data={{
          en: "Sending OTP...",
          bn: "ওটিপি পাঠানো হচ্ছে...",
        }}
      />
    );
  }
  if (isSuccess) {
    successToast(
      <Language
        data={{
          en: "OTP sent successfully! Please check your phone number",
          bn: "ওটিপি সফলভাবে পাঠানো হয়েছে! আপনার ফোন এসএমএস চেক করুন",
        }}
      />
    );
    setCookies("token", data.token, {
      expires: new Date(Date.now() + 1000 * 60 * 5),
    });

    if (redirect) {
      router.push(`/login/otp?redirect=${redirect}`);
    } else {
      router.push("/login/otp");
    }
    reset();
  }

  return (
    <Layout>
      <div className="py-5">
        <div className="container py-md-5">
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-inner">
              <div className="text-center">
                <h4 className="title">
                  <Language
                    data={{
                      en: "Login",
                      bn: "লগইন",
                    }}
                  />
                </h4>
                <p>
                  <Language
                    data={{
                      en: "Welcome back! Please Login with your phone number",
                      bn: "স্বাগতম ফিরে এসেছেন! আপনার ফোন নম্বর দিয়ে লগইন করুন",
                    }}
                  />
                </p>
              </div>
              <div className="row g-4">
                <div className="col-12">
                  <Input
                    type={"tel"}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    label={convertLang({
                      en: "Phone Number",
                      bn: "ফোন নম্বর",
                    })}
                    placeholder="+880 00000000000"
                  />
                </div>
                <div className="col-12">
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="btn btn-base w-100 h-48"
                  >
                    {isLoading ? (
                      <Language
                        data={{
                          en: "Sending OTP...",
                          bn: "ওটিপি পাঠানো হচ্ছে...",
                        }}
                      />
                    ) : (
                      <Language
                        data={{
                          en: "Send OTP",
                          bn: "ওটিপি পাঠান",
                        }}
                      />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
