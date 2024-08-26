import React from "react";
import ProductCard from "@/components/shared/product-card";

interface IProductsProps {
  products: IProduct[];
}

const Products = ({ products }: IProductsProps) => {
  return (
    <section id="products" className="container py-24 lg:py-32">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {products?.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};

export default Products;
