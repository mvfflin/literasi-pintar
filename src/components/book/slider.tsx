// import Slider, { Settings } from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { Swiper, SwiperSlide, SwiperProps } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import { CSSProperties } from "react";

type props = {
  bookArray: string[];
};

export const CoverSlider = ({ bookArray }: props) => {
  const settings: SwiperProps = {
    modules: [Pagination, Navigation],
    navigation: true,
    pagination: {
      dynamicBullets: true,
    },
    style: {
      "--swiper-navigation-color": "#fff",
      "--swiper-pagination-color": "#fff",
    } as CSSProperties,
  };
  return (
    <Swiper {...settings}>
      {bookArray.map((coverid: any) => {
        return (
          <SwiperSlide key={coverid}>
            <div key={coverid} className="text-center my-10">
              <img
                src={
                  coverid > 0
                    ? `https://covers.openlibrary.org/b/id/${coverid}-L.jpg`
                    : "https://placehold.co/200x300"
                }
                className="w-auto h-full mx-auto"
              />
              {/* <h1>{coverid}</h1> */}
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
