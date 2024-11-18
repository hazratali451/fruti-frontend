import { ArrowLeft, ArrowRight } from "@/src/components/Icon";
import Language from "@/src/helper/Language";
import React from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const ClientSection = () => {
  const ref = React.useRef(null);

  const goNext = () => {
    ref.current.swiper.slideNext();
  };
  const goPrev = () => {
    ref.current.swiper.slidePrev();
  };
  return (
    <section className="client-section">
      <div className="container">
        <h2 className="text-center mb-4 mb-md-5">
          <Language
            data={{
              en: "What our customers say about us",
              bn: "আমাদের গ্রাহকরা আমাদের সম্পর্কে কি বলে",
            }}
          />
        </h2>
        <div className="client-slider">
          <Swiper
            modules={[Autoplay]}
            loop={true}
            spaceBetween={20}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              500: {
                slidesPerView: 1.3,
                spaceBetween: 30,
              },
              576: {
                slidesPerView: 2.2,
                spaceBetween: 30,
              },
              768: {
                slidesPerView: 2.6,
                spaceBetween: 30,
              },
              992: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            ref={ref}
            autoplay={{
              delay: 2000,
              pauseOnMouseEnter: true,
            }}
          >
            {testimonials?.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="client-item">
                  <blockquote>{item.review}</blockquote>
                  <h6 className="name">{item.name}</h6>
                  <span className="designation">{item.degignation}</span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            className="btn no-gutter border-0 arrow-btn"
            type="button"
            onClick={() => goPrev()}
          >
            <ArrowLeft />
          </button>
          <button
            className="btn no-gutter border-0 arrow-btn"
            type="button"
            onClick={() => goNext()}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

const testimonials = [
  {
    name: "Sazzad Bin Ahsan  Sourav",
    degignation: "Author of Brandmark, 2 Cents Podcast",
    review:
      "বগুড়ার দই আমার ও আমার পরিবারের খুবই পছন্দ। এমন একটা বিশ্বস্ত মাধ্যম থেকে নিয়মিত কিনতে পারলে খুবই ভালো হবে। জাযাকাল্লাহ",
  },
  {
    name: "Farhan Tanvir Dip",
    degignation: "Founder of BIG SHOT",
    review:
      'বগুড়ার দই ঢাকায় বসে অর্ডার করার জন্য "বগুড়া থেকে" বেস্ট মনে হয়েছে। স্বাদে আর মানে সব দিক থেকেই খুব ভালো মনে হয়েছে। ',
  },
  {
    name: "Proloy Hasan",
    degignation: "Writter, Business Consultant",
    review:
      "একেবারেই এক্সক্লুসিভ স্বাদ। আমি জীবনে অনেক ধরনের দই খেয়েছি, ইনফ্যাক্ট দই আমার খুব ফেভারিট, কিন্তু এমন দই সত্যি বলতে আমি এর আগে খেয়েছি বলে মনে করতে পারিনি! শাহী দইটা অসাধারন লেগেছে!! স্বাদ মুখে লেগে থাকে একদম।",
  },
];

export default ClientSection;
