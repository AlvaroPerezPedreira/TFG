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
          <img src="./images/login/LogV2_3.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./images/login/LogV2_2.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./images/login/LogV2_4.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./images/login/LogV2_5.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./images/login/LogV2_6.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./images/login/LogV2_7.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./images/login/LogV2_8.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./images/login/LogV2_9.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./images/login/LogV2_10.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./images/login/LogV2_11.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./images/login/LogV2_12.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./images/login/LogV2_13.jpg" alt="" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
