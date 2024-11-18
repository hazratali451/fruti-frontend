import Image from "next/image";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Banner = () => {
  const bannerImages = [
    /*    "/images/banner/web4.webp", */
    "/images/banner/web.webp",
    "/images/banner/web1.webp",
    "/images/banner/web2.webp",
    "/images/banner/web3.webp",
  ];
  return (
    <section className="banner-section">
      <div className="container">
        <div className="slider-wrapper">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 2000,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            spaceBetween={30}
            slidesPerView={1}
          >
            {bannerImages.map((url, index) => (
              <SwiperSlide key={index}>
                <Link href={""} className="banner-img">
                  <Image
                    src={url}
                    width={1320}
                    height={480}
                    alt="banner-promo"
                    priority
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Banner;
