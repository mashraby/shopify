"use client";

import React, { createContext, useState, useEffect } from "react";

export interface CartContextType {
  products: IProduct[];
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CartContextProvider: React.FC<Children> = ({ children }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initial load from localStorage
    const savedProducts = localStorage.getItem("cartProducts");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
    setIsInitialized(true); // Mark initialization complete
  }, []);

  useEffect(() => {
    // Only update localStorage if products have been initialized
    if (isInitialized) {
      localStorage.setItem("cartProducts", JSON.stringify(products));
    }
  }, [products, isInitialized]);

  return (
    <CartContext.Provider value={{ products, setProducts }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartContextProvider };
