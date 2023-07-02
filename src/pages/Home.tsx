import { FC, useEffect, useState, useRef, ChangeEvent } from "react";
import ProductsService from "../service/products";
import { IParams, IProduct, IProductCategory } from "../interfaces";
import { ProductCard, Tabs } from "../components";
import { PAGINATION_LIMIT } from "../constants/constants";
import { styles } from "../constants/styles";
import { useSearchParams } from "react-router-dom";
import getUrlParams from "../helpers/getUrlParams";

const Home: FC = (): JSX.Element => {
  const [min, setMin] = useState<string>("");
  const [max, setMax] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [count, setCount] = useState(1);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<IProductCategory[]>([]);
  const [categoryId, setCategoryId] = useState<number>(1);
  // const [title, setTitle] = useState<string | null>(null);
  const limit: number = PAGINATION_LIMIT * count;
  let timeoutId = useRef<ReturnType<typeof setTimeout>>();

  const params: IParams = {
    offset: 0,
    limit,
    price_min: searchParams.get("price_min") || null,
    price_max: searchParams.get("price_max") || null,
    categoryId: +(searchParams.get("categoryId") || categoryId),
    title: searchParams.get("title") || null,
  };

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeoutId.current);

    timeoutId.current = setTimeout(() => setSearchParams(getUrlParams("title", e.target.value, searchParams)), 500);
    console.log(timeoutId.current);
  };

  const getCategories = async () => {
    const categories = await ProductsService.getProductCategories();
    setCategories(categories);
  };

  const getProducts = async () => {
    const data: IProduct[] = await ProductsService.getProducts(params);
    setProducts(data);
  };

  useEffect(() => {
    getCategories();
  }, [categoryId]);

  useEffect(() => {
    getProducts();
  }, [limit, params.title, params.price_min, params.price_max, categoryId]);

  const priceValsReset = () => {
    setMin("");
    setMax("");
    setSearchParams(getUrlParams("price_max", "", searchParams, "price_max", "price_min"));
  };

  const handleSetCategory = (id: number) => {
    setCategoryId(id);
    setSearchParams(getUrlParams("categoryId", id.toString(), searchParams));
  };

  const changeMinVal = (e: ChangeEvent<HTMLInputElement>) => {
    setMin(e.target.value);
    setSearchParams(getUrlParams("price_min", e.target.value, searchParams));
  };

  const changeMaxVal = (e: ChangeEvent<HTMLInputElement>) => {
    setMax(e.target.value);
    setSearchParams(getUrlParams("price_max", e.target.value, searchParams));
  };

  return (
    <section className="flex-grow-[1] flex flex-col py-4 md:py-6">
      <div className={`${styles.container} flex-grow-[1] py-4 md:py-6`}>
        <h2 className="text-xl text-center font-bold text-gray-900 sm:text-3xl">Product Categories</h2>

        <div className="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8">
          <div className="space-y-2 lg:block">
            <div className="relative">
              <input
                type="text"
                id="Search"
                autoComplete="off"
                placeholder="Search for..."
                onChange={handleChangeSearch}
                className="border-gray-300 p-2 md:p-4 focus:outline-cyan-700 rounded border [&_summary::-webkit-details-marker]:hidden w-full shadow-sm sm:text-md"
              />
              <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                <button type="button" className="text-gray-600 hover:text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </button>
              </span>
            </div>

            <details className="overflow-hidden select-none rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-2 p-2 md:p-4 text-gray-900 transition">
                <span className="text-sm font-medium">Price</span>
                <span className="transition group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </span>
              </summary>
              <div className="border-t border-gray-200 bg-white">
                <header className="flex items-center justify-between p-4">
                  <span className="text-sm text-gray-700">Min and Max Price</span>
                  <button onClick={priceValsReset} type="button" className="text-md text-blue-700 font-semibold">
                    Reset
                  </button>
                </header>
                <div className="border-t border-gray-200 p-4">
                  <div className="flex justify-between gap-4">
                    <label htmlFor="FilterPriceFrom" className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">$</span>
                      <input
                        className="w-full p-1 focus:outline-gray-500 focus:outline-1 rounded-sm border-gray-200 shadow-sm sm:text-sm"
                        type="number"
                        id="FilterPriceFrom"
                        placeholder="From"
                        value={min}
                        onChange={changeMinVal}
                      />
                    </label>
                    <label htmlFor="FilterPriceTo" className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">$</span>
                      <input
                        className="w-full p-1 focus:outline-gray-500 focus:outline-1 rounded-sm border-gray-200 shadow-sm sm:text-sm"
                        type="number"
                        id="FilterPriceTo"
                        placeholder="To"
                        value={max}
                        onChange={changeMaxVal}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </details>
          </div>
          <div className="mt-2 lg:mt-0 lg:col-span-3">
            <Tabs categories={categories} categoryId={categoryId} handleSetCategory={handleSetCategory} />

            <div className="mb-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {products.map(product => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
            <div className="text-center">
              <button
                onClick={() => setCount(products.length ? count + 1 : 1)}
                className="group relative inline-block focus:outline-none focus:ring"
              >
                <span className="absolute inset-0 translate-x-0 translate-y-0 bg-yellow-300 transition-transform group-hover:translate-y-1.5 group-hover:translate-x-1.5" />
                <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest">
                  Load more
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
