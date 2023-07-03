import { FC, Fragment } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import { Pagination, Scrollbar } from "swiper";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { v4 as uuidv4 } from "uuid";

interface ISwiperImageSliders {
  images: string[];
  styles?: string;
  isOne?: boolean;
}

const SwiperImageSliders: FC<ISwiperImageSliders> = ({ images, styles = "", isOne = true }): JSX.Element => {
  const imageStyles: string = "h-[350px] w-full object-cover transition duration-500 group-hover:scale-102 sm:h-[450px]";

  return (
    <Swiper
      className="mb-3 select-none"
      spaceBetween={20}
      slidesPerView={2}
      loop={true}
      modules={[Pagination, Scrollbar]}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      breakpoints={
        isOne
          ? {
              "320": {
                slidesPerView: 1,
              },
            }
          : {
              "320": {
                slidesPerView: 1,
              },
              "640": {
                slidesPerView: 2,
              },
            }
      }
    >
      {images.map((image: string) => (
        <SwiperSlide key={image + uuidv4()}>
          <div className={`${imageStyles} ${styles}`}>
            <LazyLoadImage width={"100%"} height={"auto"} src={image} loading="lazy" effect="blur" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperImageSliders;
