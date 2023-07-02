import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductsService from "../service/products";
import { IParams, IProduct } from "../interfaces";
import { styles } from "../constants/styles";
import { ProductsList, SwiperImageSliders } from "../components";
import { CART_LOCALSTORAGE } from "../constants/constants";
import { getStorageParse } from "../helpers/localStorage";
import setToCart from "../helpers/setToCart";

const Product: FC = (): JSX.Element => {
  const [keys, setKeys] = useState<number[]>(getStorageParse(CART_LOCALSTORAGE));
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [params, setParams] = useState<IParams>({});

  const getProduct = async (id: string) => {
    const data: IProduct = await ProductsService.getProduct(id);

    setProduct(data);
    setParams({ categoryId: data?.category?.id });
  };

  const getProducts = async () => {
    const products = await ProductsService.getProducts(params);
    setProducts(products);
  };

  useEffect(() => {
    getProduct(id as string);
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    getProducts();
  }, [product]);

  const addToCart = () => setKeys(setToCart(Number(id)));

  return (
    <div className={`${styles.container} py-4 md:py-6`}>
      <div className="mb-6">
        {!!product?.id && (
          <>
            <h3 className="text-[36px] mb-[6px] font-bold uppercase text-gray-700">{product?.title}</h3>
            <p className="mb-1.5 max-w-[390px] text-md text-gray-500">{product?.description}</p>
            <p className="max-w-[390px] mb-2 font-semibold text-xl text-gray-800">Price: ${product?.price}</p>
            <SwiperImageSliders images={product.images} isOne={false} />
            <button className={`${styles.buttonYellow} hover:scale-[1.02]`} onClick={addToCart}>
              {keys.includes(Number(id)) ? "Added" : "Add to Cart"}
            </button>
          </>
        )}
      </div>
      {!!products.length && <h3 className="text-2xl md:text-4xl lg:text-5xl uppercase mb-3 font-semibold text-center">Similar products</h3>}
      <ProductsList products={products} />
    </div>
  );
};

export default Product;
