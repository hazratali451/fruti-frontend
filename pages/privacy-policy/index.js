import Layout from "@/src/components/Layout";
import Language from "@/src/helper/Language";
import Head from "next/head";
import React from "react";
import { useSelector } from "react-redux";

const PrivacyPolicy = () => {
  const language = useSelector((state) => state.language.language);
  return (
    <>
      <Head>
        <title>
          {language === "BN"
            ? "বগুড়া থেকে - গোপনীয়তা নীতি"
            : "Bogura Theke - Privacy Policy"}
        </title>
      </Head>

      <Layout>
        <div className="container py-5 privacy-policy">
          <h1>
            <Language
              data={{
                en: "Privacy Policy",
                bn: "গোপনীয়তা নীতি",
              }}
            />
          </h1>

          <section>
            <h2>
              <Language
                data={{
                  en: "1. Information We Collect:",
                  bn: "১। আমরা কি তথ্য সংগ্রহ করি",
                }}
              />
            </h2>
            <p>
              <strong>
                <Language
                  data={{
                    en: "a. Personal Information:",
                    bn: "ব্যক্তিগত তথ্যঃ",
                  }}
                />
              </strong>
              <ul>
                <li>
                  <Language
                    data={{
                      en: "When you sign up on our website, we collect your mobile number for account creation.",
                      bn: "আপনি যখন আমাদের ওয়েবসাইটে সাইন আপ করেন, তখন আমরা আপনার অ্যাকাউন্ট তৈরির জন্য আপনার মোবাইল নম্বর সংগ্রহ করি।",
                    }}
                  />
                </li>
                <li>
                  <Language
                    data={{
                      en: "During the ordering process, we collect delivery information, including your full address, and additional contact details.",
                      bn: "অর্ডার প্রক্রিয়ার সময়, আমরা ডেলিভারি সংক্রান্ত তথ্য সংগ্রহ করি, যা আপনার সম্পূর্ণ ঠিকানা এবং অতিরিক্ত যোগাযোগের বিবরণ সহিত।",
                    }}
                  />
                </li>
              </ul>
            </p>
            <p>
              <strong>
                <Language
                  data={{
                    en: "b. Usage Information:",
                    bn: "তথ্যের ব্যবহার",
                  }}
                />
              </strong>
              <ul>
                <li>
                  <Language
                    data={{
                      en: "We may collect information about your interactions with our website, such as the pages you visit and the actions you take.",
                      bn: "আমরা আপনার ওয়েবসাইটের সাথে আপনার ইন্টারেকশন সম্পর্কিত তথ্য সংগ্রহ করতে পারি, যেমন আপনি যে পৃষ্ঠাগুলি দেখছেন এবং আপনি কি করছেন।",
                    }}
                  />
                </li>
              </ul>
            </p>
          </section>

          <section>
            <h2>
              <Language
                data={{
                  en: "2. How We Use Your Information:",
                  bn: "২। আমরা আপনার তথ্য কিভাবে ব্যবহার করি:",
                }}
              />
            </h2>
            <p>
              <strong>
                <Language
                  data={{
                    en: "a. Order Processing:",
                    bn: "অর্ডার প্রক্রিয়াকরণ:",
                  }}
                />
              </strong>
              <Language
                data={{
                  en: "We use your personal and delivery information to process and fulfill your yogurt orders.",
                  bn: "আমরা আপনার ব্যক্তিগত এবং ডেলিভারি তথ্য ব্যবহার করি আপনার দই অর্ডার প্রক্রিয়া করার জন্য এবং পূরণ করার জন্য।",
                }}
              />
            </p>
            <p>
              <strong>
                {" "}
                <Language
                  data={{
                    en: "b. Account Management:",
                    bn: "একাউন্ট ব্যবস্থাপনা:",
                  }}
                />
              </strong>
              <Language
                data={{
                  en: "Your mobile number is used for account creation and to provide personalized services.",
                  bn: "আপনার মোবাইল নম্বরটি অ্যাকাউন্ট তৈরি এবং ব্যক্তিগত সেবা প্রদানের জন্য ব্যবহৃত হয়।",
                }}
              />
            </p>
            <p>
              <strong>
                <Language
                  data={{
                    en: "c. Communication:",
                    bn: "যোগাযোগ:",
                  }}
                />
              </strong>
              <Language
                data={{
                  en: "We may use your contact details to communicate with you about your  orders, promotions, and updates related to Bogura Theke.",
                  bn: "আমরা আপনার অর্ডার, প্রচারণা এবং বগুড়া থেকে সম্পর্কিত আপডেট সম্পর্কে আপনার সাথে যোগাযোগ করার জন্য আপনার যোগাযোগের বিবরণ ব্যবহার করতে পারি।",
                }}
              />
            </p>
            <p>
              <strong>
                <Language
                  data={{
                    en: "d. Improving Services:",
                    bn: "সেবা উন্নতি:",
                  }}
                />
              </strong>
              <Language
                data={{
                  en: "Usage information helps us analyze and enhance the functionality and user experience of our website.",
                  bn: "ব্যবহারের তথ্য আমাদের ওয়েবসাইটের কার্যক্ষমতা এবং ব্যবহারকারীর অভিজ্ঞতা বিশ্লেষণ এবং উন্নত করার সাহায্য করে।",
                }}
              />
            </p>
          </section>

          <section>
            <h2>
              <Language
                data={{
                  en: "3. Data Security:",
                  bn: "৩। তথ্যের নিরাপত্তা:",
                }}
              />
            </h2>
            <p>
              <strong>
                <Language
                  data={{
                    en: "a.",
                    bn: "১.",
                  }}
                />
              </strong>{" "}
              <Language
                data={{
                  en: "We employ industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction.",
                  bn: "অননুমোদিত অ্যাক্সেস, ফাঁস, পরিবর্তন এবং ধ্বংসের থেকে আপনার ব্যক্তিগত তথ্যকে সুরক্ষিত করার জন্য আমরা শিল্প মানদন্ড নিরাপত্তা ব্যবস্থা গ্রহণ করি।",
                }}
              />
            </p>
            <p>
              <strong>
                <Language
                  data={{
                    en: "b.",
                    bn: "২.",
                  }}
                />
              </strong>{" "}
              <Language
                data={{
                  en: "Payment information is processed securely through trusted third-party payment gateways, and we do not store your payment details like PIN, OTP and card number etc on our servers.",
                  bn: "পেমেন্ট তথ্য বিশ্বস্ত তৃতীয়পক্ষ পেমেন্ট গেটওয়ে মাধ্যমে নিরাপদভাবে প্রসেস করা হয়, এবং আমরা আপনার পেমেন্ট বিবরণ যেমন পিন, ওটিপি এবং কার্ড নম্বর ইত্যাদি আমাদের সার্ভারে সংরক্ষণ করি না।",
                }}
              />
            </p>
          </section>

          <section>
            <h2>
              <Language
                data={{
                  en: "4. Third-Party Disclosure:",
                  bn: "৪। তৃতীয়পক্ষের ব্যক্তকরণ:",
                }}
              />
            </h2>
            <p>
              <strong>
                <Language
                  data={{
                    en: "a.",
                    bn: "১.",
                  }}
                />
              </strong>{" "}
              <Language
                data={{
                  en: "We do not sell, trade, or otherwise transfer your personal information to outside parties. However, this does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, as long as they agree to keep this information confidential.",
                  bn: "আমরা আপনার ব্যক্তিগত তথ্য বাহ্যিক পক্ষগুলিকে বিক্রি, বাণিজ্য বা অন্যথা স্থানান্তর করি না। তবে, এটি যে বিশ্বস্ত তৃতীয় পক্ষগুলি যারা আমাদের ওয়েবসাইট চালানোতে, আমাদের ব্যবসা চালানোতে বা আপনাকে সেবা দেওয়ার সাহায্য করে, তারা এই তথ্যটি গোপনীয় রাখতে সম্মত হওয়া পর্যন্ত।",
                }}
              />
            </p>
          </section>

          <section>
            <h2>
              <Language
                data={{
                  en: "5. Consent and Opt-Out:",
                  bn: "৫। সম্মতি এবং অপ্ট-আউট:",
                }}
              />{" "}
            </h2>
            <p>
              <strong>
                <Language
                  data={{
                    en: "a.",
                    bn: "১.",
                  }}
                />
              </strong>{" "}
              <Language
                data={{
                  en: "By using our website and services, you consent to our Privacy Policy.",
                  bn: "আমাদের ওয়েবসাইট এবং সেবাগুলি ব্যবহার করতে, আপনি আমাদের গোপনীয়তা নীতিতে সম্মতি দিচ্ছেন।",
                }}
              />
            </p>
            <p>
              <strong>
                {" "}
                <Language
                  data={{
                    en: "b.",
                    bn: "২.",
                  }}
                />
              </strong>{" "}
              <Language
                data={{
                  en: "You can opt-out of promotional communications by following the unsubscribe instructions provided in our messages.",
                  bn: "আমাদের বার্তা গুলি থেকে সরে যাওয়ার নির্দেশনা অনুসরণ করে আপনি প্রচারণামূলক যোগাযোগ থেকে আপনাকে বাদ দিতে পারেন।",
                }}
              />
            </p>
          </section>

          <section>
            <h2>
              <Language
                data={{
                  en: "7. Changes to Privacy Policy:",
                  bn: "৭। গোপনীয়তা নীতি পরিবর্তন:",
                }}
              />
            </h2>
            <p>
              <Language
                data={{
                  en: "We may update this Privacy Policy to reflect changes in our practices or for other operational, legal, or regulatory reasons. Any changes will be effective immediately upon posting on this page.",
                  bn: "আমরা আমাদের  অভ্যন্তরীণ পরিবর্তন বা অন্যান্য পরিচালনামূলক, আইনি বা নীতিগত কারণে এই গোপনীয়তা নীতি আপডেট করতে পারি। যেকোনো পরিবর্তন এই পৃষ্ঠাতে পোস্ট করার পর তা তাৎক্ষণিকভাবে কার্যকর হবে।",
                }}
              />
            </p>
          </section>

          <section>
            <h2>
              <Language
                data={{
                  en: "8. Contact Us:",
                  bn: "৮। আমাদের সাথে যোগাযোগ:",
                }}
              />
            </h2>
            <p>
              <Language
                data={{
                  en: "If you have any questions or concerns regarding our Privacy Policy, please contact us at",
                  bn: "আমাদের গোপনীয়তা নীতি সম্পর্কে আপনার যেকোনো প্রশ্ন বা সমস্যা থাকলে অনুগ্রহ করে আমাদের সাথে যোগাযোগ করুন",
                }}
              />{" "}
              <b>
                <a
                  style={{ color: "var(--base)" }}
                  href="mailto:contact@boguratheke.com"
                >
                  contact@boguratheke.com
                </a>
              </b>
            </p>
          </section>
          <p>
            <Language
              data={{
                en: "Thank you for choosing Bogura Theke. We appreciate your trust in us.",
                bn: "বগুড়া থেকে চয়ন করার জন্য আপনাকে ধন্যবাদ। আমরা আপনাদের বিশ্বাসকে সম্মান করি।",
              }}
            />
            <hr />
            <strong>
              <Language
                data={{
                  en: "Last Updated: ৪th May 2024",
                  bn: "সর্বশেষ হালনাগাদ: ৪-ই মে ২০২৪",
                }}
              />
            </strong>
          </p>
        </div>
      </Layout>
    </>
  );
};

export default PrivacyPolicy;
