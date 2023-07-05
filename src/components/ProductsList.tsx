import { FC } from "react";
import { IProduct } from "../interfaces";
import { ProductCard } from ".";
import { styles } from "../constants/styles";

interface IProductsList {
  products: IProduct[];
}

const ProductsList: FC<IProductsList> = ({ products }): JSX.Element => {
  const sortProducts = (products: IProduct[]): IProduct[] => {
    return products.sort((a, b) => Number(a.price) - Number(b.price));
  };

  return (
    <div
      className={`${styles.borderGray} border-t-0 rounded-t-none p-1 sm:p-2 md:p-4 flex flex-col lg:grid lg:grid-cols-3 lg:items-start gap-2 sm:gap-3 md:gap-4 mb-5`}
    >
      {!!products.length && sortProducts(products)?.map((product: IProduct) => <ProductCard key={product.id} {...product} />)}
    </div>
  );
};

export default ProductsList;
