import { FC } from "react";
import { IProduct } from "../interfaces";
import { ProductCard } from ".";

interface IProductsList {
  products: IProduct[];
}

const ProductsList: FC<IProductsList> = ({ products }): JSX.Element => {
  return (
    <div className="mb-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {!!products.length && products?.map((product: IProduct) => <ProductCard key={product.id} {...product} />)}
    </div>
  );
};

export default ProductsList;
