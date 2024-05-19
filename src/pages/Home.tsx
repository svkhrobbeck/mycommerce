import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import { styles } from "../constants/styles";
import ProductsService from "../service/products";
import getUrlParams from "../helpers/getUrlParams";
import { IParams, IProduct, IProductCategory } from "../interfaces";
import { ProductFilterBar, ProductsList, ProductsNotFound, Tabs } from "../components";

const Home: FC = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<IProductCategory[]>([]);
  const [categoryId, setCategoryId] = useState<number>(+(searchParams.get("category") || 1));
  const [isLoading, setIsLoading] = useState(false);

  const params: IParams = {
    price_min: searchParams.get("min") || null,
    price_max: searchParams.get("max") || null,
    categoryId: +(searchParams.get("category") || categoryId),
    title: searchParams.get("title") || null,
  };

  const handleSetCategory = (id: number) => {
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
  }, [params.title, params.price_min, params.price_max, categoryId]);

  useEffect(() => {
    getCategories();
  }, [categoryId]);

  return (
    <section className={`${styles.py} ${styles.container} ${styles.flexCol}  flex-grow-[1]`}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Ecommerce | Home</title>
      </Helmet>
      <h2 className="mb-4 lg:mb-8 sm:text-3xl text-xl text-center font-bold text-gray-900">Product Categories</h2>
      <ProductFilterBar />
      <Tabs categories={categories} categoryId={categoryId} handleSetCategory={handleSetCategory} />
      {!!products.length ? <ProductsList products={products} /> : <>{!isLoading && <ProductsNotFound />}</>}
    </section>
  );
};

export default Home;
