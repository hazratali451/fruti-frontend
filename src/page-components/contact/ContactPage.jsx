/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Input from "@/src/components/Input";
import Layout from "@/src/components/Layout";
import Language from "@/src/helper/Language";
import { errorToast, successToast } from "@/utls/toasts/toast";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";

const ContactPage = () => {
  // Language Change Function
  const language = useSelector((state) => state.language.language);
  const convertLang = (data) => {
    if (language === "BN") {
      return data.bn;
    } else {
      return data.en;
    }
  };
  const [contactFrom, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    //Validate mobile number with regex
    const mobileRegex = /^(\+88)?(01[3-9]\d{8})$/;
    if (!mobileRegex.test(contactFrom.phone)) {
      errorToast(
        language === "EN" ? "Invalid Mobile Number!" : "ভুল মোবাইল নাম্বার!"
      );
      setIsLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("access_key", process.env.NEXT_PUBLIC_EMAIL_API_KEY);
    formData.append("name", contactFrom.name);
    formData.append("email", contactFrom.email);
    formData.append("phone", contactFrom.phone);
    formData.append("message", contactFrom.message);
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
    if (res.success) {
      successToast(
        language === "EN"
          ? "Message sent successfully!"
          : "মেসেজ সফলভাবে পাঠানো হয়েছে!"
      );
      setIsLoading(false);
      setContactForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } else {
      setIsLoading(false);
      errorToast(
        language === "EN"
          ? "Message sending failed!, Please try again later"
          : "মেসেজ পাঠানো ব্যর্থ হয়েছে!, দয়া করে পরে আবার চেষ্টা করুন"
      );
    }
  };

  return (
    <Layout>
      <div className="py-5">
        <div className="container">
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="row flex-wrap-reverse g-4">
              <div className="col-lg-6">
                <div className="row g-4">
                  <div className="col-sm-12">
                    <Input
                      required={true}
                      type={"text"}
                      value={contactFrom.name}
                      onChange={(e) =>
                        setContactForm({
                          ...contactFrom,
                          name: e.target.value,
                        })
                      }
                      label={convertLang({
                        en: "Your Name:",
                        bn: "আপনার নামঃ",
                      })}
                      placeholder="Ex : Md. Habibullah"
                    />
                  </div>
                  <div className="col-sm-12">
                    <Input
                      type={"email"}
                      value={contactFrom.email}
                      onChange={(e) =>
                        setContactForm({
                          ...contactFrom,
                          email: e.target.value,
                        })
                      }
                      label={convertLang({
                        en: "Email:",
                        bn: "ইমেইলঃ",
                      })}
                      placeholder={convertLang({
                        en: "Ex : demo@gmail.com",
                        bn: "Ex : demo@gmail.com",
                      })}
                    />
                  </div>
                  {/* Mobile number */}
                  <div className="col-sm-12">
                    <Input
                      required={true}
                      type={"number"}
                      value={contactFrom.phone}
                      onChange={(e) =>
                        setContactForm({
                          ...contactFrom,
                          phone: e.target.value,
                        })
                      }
                      label={convertLang({
                        en: "Mobile Number:",
                        bn: "মোবাইল নাম্বারঃ",
                      })}
                      placeholder="Ex : 01XXXXXXXXX"
                    />
                  </div>
                  <div className="col-sm-12">
                    <Input
                      required={true}
                      type={"text"}
                      value={contactFrom.message}
                      onChange={(e) =>
                        setContactForm({
                          ...contactFrom,
                          message: e.target.value,
                        })
                      }
                      label={convertLang({
                        en: "Message:",
                        bn: "মেসেজঃ",
                      })}
                      textarea
                    />
                  </div>
                  <div className="col-sm-12">
                    <button
                      disabled={isLoading}
                      className="btn btn-base"
                      type="submit"
                    >
                      <Language
                        data={{
                          en: isLoading ? "Sending Message..." : "Send Message",
                          bn: isLoading
                            ? "মেসেজ পাঠানো হচ্ছে..."
                            : "মেসেজ পাঠান",
                        }}
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                {/* Contact Details */}
                <div className="contact-details ps-lg-5 pt-lg-4">
                  <h5 className="title">
                    <Language
                      data={{
                        en: "Contact Details",
                        bn: "যোগাযোগের ঠিকানা",
                      }}
                    />
                  </h5>
                  <p className="m-0">
                    <Language
                      data={{
                        en: "Feel free to contact us",
                        bn: "যোগাযোগ করার জন্য আপনার মন্তব্য দিন",
                      }}
                    />
                  </p>
                  <br />
                  <ul className="d-flex flex-column gap-2">
                    <li>
                      <Image
                        width={24}
                        height={24}
                        src="/images/social/phone-call.png"
                        alt="Phone"
                        className="img-fluid"
                      />
                      <a href="tel:+8801332743232" className="text-body ps-3">
                        +8801332-743232
                      </a>
                    </li>
                    <li>
                      <Image
                        width={24}
                        height={24}
                        src="/images/social/email.png"
                        alt="Email"
                        className="img-fluid"
                      />
                      <a
                        href="mailto:contact@bogura-theke.com"
                        className="text-body ps-3"
                      >
                        hello@boguratheke.com
                      </a>
                    </li>
                    <li>
                      <Image
                        width={24}
                        height={24}
                        src="/images/social/pin.png"
                        alt="Location"
                        className="img-fluid"
                      />
                      <a
                        href="https://goo.gl/maps/9Jz9XWYv3y3Xa8jy6"
                        target="_blank"
                        rel="noreferrer"
                        className="text-body ps-3"
                      >
                        <Language
                          data={{
                            en: "Bogura, Bangladesh",
                            bn: "বগুড়া, বাংলাদেশ",
                          }}
                        />
                      </a>
                    </li>
                  </ul>
                  <br />
                  <div className="d-flex gap-3">
                    {/* Whatsapp button */}
                    <div className="whatsapp-btn">
                      <a
                        href="https://wa.me/8801332743232"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Image
                          width={60}
                          height={60}
                          src="/images/social/whatsapp.png"
                          alt="Whatsapp"
                          className="img-fluid"
                        />
                      </a>
                    </div>
                    {/* Messenger button */}
                    <div className="messenger-btn">
                      <a
                        href="https://m.me/boguratheke"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Image
                          width={60}
                          height={60}
                          src="/images/social/messenger.png"
                          alt="Messenger"
                          className="img-fluid"
                        />
                      </a>
                    </div>
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

export default ContactPage;
