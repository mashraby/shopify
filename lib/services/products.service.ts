"use server";

import ApiInstance from "../api";

export async function getAllProducts() {
  const products: IProduct[] = await ApiInstance.get("/products").then(
    (res) => res.data?.products
  );
  return products;
}

export async function getSingleProduct(id: string | number) {
  const singleProduct: IProduct = await ApiInstance.get(`/products/${id}`).then(
    (res) => res.data?.product
  );
  return singleProduct;
}

export async function getProductsWithCategory(type: string) {
  const products: IProduct[] = await ApiInstance.get(
    `/products/category?type=${type}`
  ).then((res) => res.data?.products);
  return products;
}
