import { FC, useEffect, useState } from "react";
import ProductsService from "../service/products";
import { IParams, IProduct, IProductCategory } from "../interfaces";
import { ProductFilterBar, ProductsList, ProductsNotFound, Tabs } from "../components";
import { PAGINATION_LIMIT } from "../constants/constants";
import { styles } from "../constants/styles";
import { useSearchParams } from "react-router-dom";
import getUrlParams from "../helpers/getUrlParams";
import { spinner } from "../assets";
const Home: FC = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [count, setCount] = useState<number>(1);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<IProductCategory[]>([]);
  const [categoryId, setCategoryId] = useState<number>(+(searchParams.get("category") || 1));
  const [isLoading, setIsLoading] = useState(false);
  const limit: number = PAGINATION_LIMIT * count;

  console.log(isLoading);

  const params: IParams = {
    offset: 0,
    limit,
    price_min: searchParams.get("price_min") || null,
    price_max: searchParams.get("price_max") || null,
    categoryId: +(searchParams.get("category") || categoryId),
    title: searchParams.get("title") || null,
  };

  const handleSetCategory = (id: number) => {
    if (count > 1) setCount(1);
    setCategoryId(id);
    setSearchParams(getUrlParams("category", id.toString(), searchParams));
  };

  const getProducts = async () => {
    setIsLoading(true);
    try {
      const data: IProduct[] = await ProductsService.getProducts(params);
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCategories = async () => {
    const categories = await ProductsService.getProductCategories();
    setCategories(categories);
  };

  useEffect(() => {
    getProducts();
  }, [limit, params.title, params.price_min, params.price_max, categoryId]);

  useEffect(() => {
    getCategories();
  }, [categoryId]);

  return (
    <>
      <section className={`${styles.py} ${styles.container} ${styles.flexCol}  flex-grow-[1]`}>
        <h2 className="mb-4 lg:mb-8 sm:text-3xl text-xl text-center font-bold text-gray-900">Product Categories</h2>
        <ProductFilterBar setCount={setCount} />

        <Tabs categories={categories} categoryId={categoryId} handleSetCategory={handleSetCategory} />

        {!!products.length ? (
          <>
            <ProductsList products={products} />
            <button
              disabled={isLoading}
              className={`${styles.buttonDarkGray} ${styles.flexCenter} mx-auto`}
              onClick={() => setCount(prev => (products.length ? prev + 1 : 1))}
            >
              {isLoading ? "Loading..." : "Load More"}
              {isLoading && <img className="ml-[6px]" src={spinner} />}
            </button>
          </>
        ) : (
          <>{!isLoading && <ProductsNotFound />}</>
        )}
      </section>
    </>
  );
};

export default Home;
