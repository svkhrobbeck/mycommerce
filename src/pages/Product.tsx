import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductsService from "../service/products";
import { IProduct } from "../interfaces";
import { styles } from "../constants/styles";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Product: FC = (): JSX.Element => {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);

  console.log(product);

  const getProduct = async (id: string | null) => {
    const { data } = await ProductsService.getProduct(id);

    setProduct(data || null);
  };

  useEffect(() => {
    getProduct(id || null);
  }, [id]);

  return (
    <div className={`${styles.container} py-4 md:py-6`}>
      <div className="mb-3">
        <h3 className="text-[36px] mb-1.5 font-bold uppercase text-gray-700 group-hover:underline group-hover:underline-offset-4">
          {product?.title}
        </h3>
        <p className="mb-1.5 max-w-[390px] text-md text-gray-500">{product?.description}</p>
        <p className="max-w-[390px] font-semibold text-xl text-gray-800">Price: ${product?.price}</p>
      </div>
      <div className="relative group block h-[550px] sm:h-[450px] mb-4">
        <img src={product?.images[0]} className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0" />
        <img src={product?.images[1]} className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100" />
      </div>
      <Swiper
        spaceBetween={2}
        slidesPerView={2}
        loop={true}
        navigation
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        breakpoints={{
          "320": {
            slidesPerView: 1,
          },
          "640": {
            slidesPerView: 2,
          },
          "990": {
            slidesPerView: 3,
          },
        }}
      >
        {product?.images.map(image => (
          <>
            <SwiperSlide>
              <img className="w-full select-none h-auto" src={image} key={image} />
            </SwiperSlide>
            <SwiperSlide>
              <img className="w-full select-none h-auto" src={image} key={image} />
            </SwiperSlide>
          </>
        ))}
      </Swiper>
    </div>
  );
};

export default Product;
