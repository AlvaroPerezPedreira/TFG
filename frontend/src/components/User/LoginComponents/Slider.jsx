import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../styles/login.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function LoginSlider() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="./images/login/logImg1.jpeg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./images/login/logImg2.jpeg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./images/login/logImg3.jpeg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./images/login/logImg4.jpeg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./images/login/logImg5.jpeg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./images/login/logImg6.jpeg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./images/login/logImg7.jpeg" alt="" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
