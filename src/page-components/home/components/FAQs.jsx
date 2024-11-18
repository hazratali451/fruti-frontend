import { FaqClose, FaqOpen } from "@/src/components/Icon";
import Language from "@/src/helper/Language";
import { Accordion } from "react-bootstrap";

const FAQs = () => {
  return (
    <section className="faqs-section">
      <div className="container">
        <div className="mb-4 mb-md-5 text-center">
          <h3>
            <Language
              data={{
                en: "Frequently asked questions",
                bn: "সবাই সচরাচর যা জানতে চায়",
              }}
            />
          </h3>
          <p className="section-subtitle mt-3">
            <Language
              data={{
                en: "Everything you need to know about the product and billing.",
                bn: "পণ্য এবং বিলিং সম্পর্কে আপনার যা জানা দরকার।",
              }}
            />
          </p>
        </div>
        <div className="mx-auto" style={{ maxWidth: "768px" }}>
          <FaqItems />
        </div>
      </div>
    </section>
  );
};

const FaqItems = () => {
  return (
    <Accordion defaultActiveKey={0}>
      {data?.map(({ titleBn, title, textBn, text }, i) => (
        <Accordion.Item eventKey={i} key={i}>
          <Accordion.Header>
            <span className="me-2">
              <Language
                data={{
                  en: title,
                  bn: titleBn,
                }}
              />{" "}
            </span>
            <span className="plus ms-auto">
              <FaqOpen />
            </span>
            <span className="minus ms-auto">
              <FaqClose />
            </span>
          </Accordion.Header>
          <Accordion.Body>
            <div className="faq-text">
              {" "}
              <Language
                data={{
                  en: text,
                  bn: textBn,
                }}
              />
            </div>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};
const data = [
  /*  {
    titleBn: "এটি কি বাংলাদেশ সরকার কর্তৃক অনুমোদিত একটি ব্যাবসা প্রতিষ্টান?",
    title: "Is this an registered business by the Government of Bangladesh?",
    textBn: [
      "জ্বী, এটি বাংলাদেশ সরকার কৃতক ডিজিটাল বিজনেস আইডেন্টিফিকেশন এ নিবন্ধিত একটি ব্যাবসা প্রতিষ্টান। আমাদের ডিজিটাল বিজনেস আইডেন্টিফিকেশন নম্বর হল xxxxxxx",
    ],
    text: [
      "Yes, it is a registered business under the Digital Business Identification of the Government of Bangladesh. Our digital business identification number is xxxxxxx",
    ],
  }, */
  {
    titleBn:
      "প্রিমিয়াম মিষ্টি দই, মেজবান/শাহী দই এবং সাদা দই এর ভিতর পার্থক্য কি?",
    title:
      "What is the difference between Premium Sweet Doi, Mezban/Shahi Doi and Plain Doi?",
    textBn: [
      "প্রিমিয়াম মিষ্টি দই এ সবচেয়ে বেশি মিষ্টি হয়ে থাকে, মেজবান/শাহী দই এ মিষ্টি তুলনামুলক কম হয়ে থাকে তবে দুধের ঘনত্ব বেশী হওয়ার এটির স্বাদ সবচেয়ে বেশি এবং সাদা দই এ কোন প্রকার চিনি ব্যবহার করা হয়না।",
    ],
    text: [
      "Premium Sweet Doi is the sweetest, Mezban/Shahi Doi is comparatively less sweet but has the highest milk density, and White Doi does not use any sugar.",
    ],
  },
  {
    titleBn:
      "কোন প্রোডাক্ট অর্ডার করার সময় কি আমাকে পুরো টাকা প্রথমেই দিতে হবে?",
    title:
      "Do I have to pay the full amount at the time of ordering a product?",
    textBn: [
      "আপনি চাইলে চাইলে পুরো টাকা পেমেন্ট করতে পারেন, অথবা আংশিক পেমেন্ট করতে পারবেন যেখানে টোটাল প্রোডাক্ট এর মাত্র ২৫% + ডেলিভেরি চার্জ দিতে হবে এবং বাকি টাকা ডেলিভেরির সময় পরিশোধ করতে পারবেন।",
    ],
    text: [
      "You can pay the full amount if you want, or you can pay a partial amount where you have to pay only 25% of the total product + delivery charge and the rest of the money at the time of delivery.",
    ],
  },
  {
    titleBn: "আপনাদের ডেলিভেরি করতে কত সময় লাগে?",
    title: "How long does it take for you to deliver?",
    textBn: [
      "দই একটি অতি সংবেদনশীল খাবার, তাই আমরা বেশী স্টক করিনা, সাধারণত অর্ডার করার পরেরদিন সরাসরি বগুড়া থেকে নিয়ে এসে  ডেলিভেরি করা হয় তবে যদি ইন্সট্যান্ট স্টক থাকে তাহলে অর্ডার করার দিনই  ডেলিভেরি করা হয়",
    ],
    text: [
      "Since yogurt is a very perishable food, we do not stock much, usually after ordering, it is delivered directly from Bogura the next day, but if there is instant stock, it is delivered on the day of ordering.",
    ],
  },
  {
    titleBn: "আপনাদের দই এর ওজন কত হয়?",
    title: "How much does your yogurt weigh?",
    textBn: ["আমাদের প্রত্যেকটি দই এর নীট ওজন ৬৫০+- গ্রাম হয়ে থাকে"],
    text: ["The net weight of each of our yogurt is 650+- grams"],
  },

  /* {
    titleBn:
      "কোন প্রোডাক্ট অর্ডার করার সময় কি আমাকে পুরো টাকা প্রথমেই দিতে হবে?",
    title:
      "Do I have to pay the full amount at the time of ordering a product?",
    textBn: [
      "আপনি চাইলে চাইলে পুরো টাকা পেমেন্ট করতে পারেন, অথবা আংশিক পেমেন্ট করতে পারবেন যেখানে টোটাল প্রোডাক্ট এর মাত্র ২৫% + ডেলিভেরি চার্জ দিতে হবে এবং বাকি টাকা ডেলিভেরির সময় পরিশোধ করতে পারবেন।",
    ],
    text: [
      "You can pay the full amount if you want, or you can pay a partial amount where you have to pay only 25% of the total product + delivery charge and the rest of the money at the time of delivery.",
    ],
  }, */
  /*  {
    titleBn: "কেন আমাদের পুরোপুরি ক্যাশ অন ডেলিভারি সিস্টেম নেই?",
    title: "Why don't we have a full cash on delivery system?",
    textBn: [
      "যেহেতু দই একটি অতি সংবেদনশীল খাবার, এবং এটি বগুড়া থেকে আনতে হচ্ছে তাই আমাদের পুরোপুরি ক্যাশ অন ডেলিভারি সিস্টেম নেই, তবে মাত্র ২৫% অগ্রিম পেমেন্ট করে আপনি আপনার পছন্দের প্রোডাক্ট অর্ডার করতে পারবেন। এবং এই ২৫% টাকা নেওয়া হয়  শুধুমাত্র অর্ডার নিশ্চিত করার জন্য",
    ],
    text: [
      "Since yogurt is a very perishable food and it is being brought from Bogura, we do not have a full cash on delivery system, but you can order your favorite product by paying only 25% advance. And this 25% money is taken only to confirm the order",
    ],
  }, */
  {
    titleBn: "আমাদের দই কোথায় তৈরি হয়?",
    title: "Where is our yogurt made?",
    textBn: [
      "আমাদের দই বগুড়ার একটি বিখ্যাত এবং সরকার (বি,এস,টি,আই) অনুমোদিত, আই,এস,ও সার্টিফাইড কারখানায় তৈরি হয়, এবং অর্ডার করার পর আপনার কাছে পৌঁছে দেয়া হয় সরাসরি বগুড়া থেকে।",
    ],
    text: [
      "Our yogurt is made in a famous and government (BSTI) approved, ISO certified factory in Bogura, and after ordering, it is delivered directly to you from Bogura.",
    ],
  },
];
export default FAQs;
