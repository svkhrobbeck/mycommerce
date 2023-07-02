import { IParams } from "../interfaces";
import axios from "./axios";

const ProductsService = {
  async getProducts(params: IParams) {
    const { data } = await axios.get("products", { params });
    return data;
  },
  async getProduct(id: string) {
    const { data } = await axios.get(`products/${id}`);
    return data;
  },
  async getProductCategories() {
    const { data } = await axios.get("categories");
    return data;
  },
};

export default ProductsService;
