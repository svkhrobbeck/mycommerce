import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductsService from "../service/products";
import { IParams, IProduct } from "../interfaces";
import { styles } from "../constants/styles";
import { Loader, ProductsList, SwiperImageSliders } from "../components";
import { CART_LOCALSTORAGE } from "../constants/constants";
import { getStorageParse } from "../helpers/localStorage";
import useLocalStorage from "../hooks/useLocalstorage";
import { Helmet } from "react-helmet";

const Product: FC = (): JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [keys, setKeys] = useState<number[]>(getStorageParse(CART_LOCALSTORAGE).map(item => Number(item.id)));
  const [carts, setCarts] = useState<IProduct[]>(getStorageParse(CART_LOCALSTORAGE));
  const [product, setProduct] = useState<IProduct | null>(null);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [params, setParams] = useState<IParams>({});
  const [isLoading, setIsLoading] = useState(false);
  const { toggle } = useLocalStorage();

  const addToCart = (): void => setCarts(toggle({ ...product }));

  useEffect((): void => {
    setKeys(carts.map(cart => Number(cart.id)));
  }, [carts]);

  const getProduct = async (id: string) => {
    const data: IProduct = await ProductsService.getProduct(id);

    setProduct(data);
    setParams({ categoryId: data?.category?.id });
  };

  const getProducts = async () => {
    setIsLoading(true);
    try {
      const products = await ProductsService.getProducts(params);
      setProducts(products);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProduct(id as string);
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    getProducts();
  }, [product]);

  return (
    <>
      {!!product ? (
        <div className={`${styles.container} py-4 md:py-6`}>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Ecommerce | {product?.title}</title>
          </Helmet>
          <h3 className="text-[36px] mb-[6px] font-bold uppercase text-gray-700">{product?.title}</h3>
          <p className="mb-1.5 max-w-[390px] text-md text-gray-500">{product?.description}</p>
          <p className="max-w-[390px] mb-2 font-semibold text-xl text-gray-800">Price: ${product?.price}</p>
          <SwiperImageSliders images={product?.images || []} isOne={false} />
          <button className={`${styles.buttonYellow} ${styles.focus} mb-3`} disabled={isLoading} onClick={addToCart}>
            {isLoading ? "Loading..." : <>{keys.includes(Number(id)) ? "Added" : "Add to Cart"}</>}
          </button>
          <button className={`${styles.buttonGreen} ${styles.focus} mb-6 w-full`} onClick={() => navigate("/")}>
            Back to Home
          </button>

          {!!products.length && (
            <>
              <h3 className="text-2xl border-b md:text-4xl lg:text-5xl uppercase pb-2 font-semibold text-center">
                <span className={`${styles.borderGray} border-b-0 rounded-b-none px-2`}>Similar products</span>
              </h3>
              <ProductsList products={products} />
            </>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Product;
