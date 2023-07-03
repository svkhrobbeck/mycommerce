import { FC, useEffect, useState } from "react";
import ProductsService from "../service/products";
import { IParams, IProduct, IProductCategory } from "../interfaces";
import { Loader, ProductFilterBar, ProductsList, Tabs } from "../components";
import { PAGINATION_LIMIT } from "../constants/constants";
import { styles } from "../constants/styles";
import { useSearchParams } from "react-router-dom";
import getUrlParams from "../helpers/getUrlParams";
const Home: FC = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [count, setCount] = useState<number>(1);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<IProductCategory[]>([]);
  const [categoryId, setCategoryId] = useState<number>(+(searchParams.get("category") || 1));
  const limit: number = PAGINATION_LIMIT * count;

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
    const data: IProduct[] = await ProductsService.getProducts(params);
    setProducts(data);
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
      {!!products.length ? (
        <section className={`${styles.py} ${styles.flexCol}  flex-grow-[1]`}>
          <div className={`${styles.py} ${styles.container} flex-grow-[1]`}>
            <h2 className="mb-4 lg:mb-8 sm:text-3xl text-xl text-center font-bold text-gray-900">Product Categories</h2>
            <ProductFilterBar setCount={setCount} />
            <div className="lg:grid lg:grid-cols-4 lg:items-start lg:gap-8">
              <div className="mt-2 lg:mt-0 lg:col-span-4">
                <Tabs categories={categories} categoryId={categoryId} handleSetCategory={handleSetCategory} />
                <ProductsList products={products} />
                <div className="text-center">
                  <button className={`${styles.buttonPurpleOutlined}`} onClick={() => setCount(products.length ? count + 1 : 1)}>
                    Load More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Home;
