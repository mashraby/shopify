"use client";

import React, { useContext } from "react";
import { Button } from "../ui/button";
import { CartContext } from "@/contexts/cart-context";
import { toast } from "sonner";
import BasketActions from "./basket-actions";

interface AddCartBtnProps {
  product: IProduct;
  className?: string;
  isBasket?: boolean;
}

const AddCartBtn = ({
  product,
  className,
  isBasket = true,
}: AddCartBtnProps) => {
  const { products, setProducts } = useContext(CartContext) as any;

  // handleAddToCart funksiyasini async qilish
  const handleAddToCart = async (): Promise<void> => {
    try {
      const foundProduct = products?.find(
        (fp: IProduct) => fp.id === product?.id
      );
      const index = products?.findIndex(
        (fp: IProduct) => fp.id === product?.id
      );

      if (foundProduct) {
        const newArr = products.with(index, {
          ...product,
          quantity: foundProduct?.quantity + 1,
        });

        setProducts(newArr);
      } else {
        setProducts([...products, { ...product, quantity: 1 }]);
      }
    } catch (error) {
      throw error; // Xatoni tashlash
    }
  };

  const handleAddToCartWithToast = async () => {
    // handleAddToCart funksiyasini to'liq ishga tushirishni to'xtatish
    await toast.promise(handleAddToCart(), {
      loading: "Adding to cart...",
      success: "Product added to cart!",
      error: "Failed to add product to cart!",
    });
  };

  const condition = products?.find((p: IProduct) => p.id == product.id);

  return !condition && isBasket ? (
    <Button
      size={"sm"}
      className={className ? className : ""}
      onClick={handleAddToCartWithToast}
    >
      Add To Cart
    </Button>
  ) : (
    <BasketActions item={condition} />
  );
};

export default AddCartBtn;
