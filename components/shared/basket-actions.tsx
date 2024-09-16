import React, { useContext } from "react";
import { CartContext } from "@/contexts/cart-context";
import { Button } from "../ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";

interface BasketActionsProps {
  item: IProduct;
  showDelete?: boolean;
}

const BasketActions = ({ item, showDelete = false }: BasketActionsProps) => {
  const { products, setProducts } = useContext(CartContext) as any;

  const handleDeleteCart = (item: IProduct) => {
    setProducts(products?.filter((fp: IProduct) => fp.id !== item.id));
  };

  const handleIncreaseQty = (item: IProduct) => {
    const index = products?.findIndex((fp: IProduct) => fp.id == item.id);
    const newObj = { ...item, quantity: item.quantity + 1 };
    setProducts(products.with(index, newObj));
  };

  const handleDecreaseQty = (item: IProduct) => {
    if (item.quantity !== 1) {
      const index = products?.findIndex((fp: IProduct) => fp.id == item.id);
      const newObj = { ...item, quantity: item.quantity - 1 };
      setProducts(products.with(index, newObj));
    } else {
      setProducts(products?.filter((fp: IProduct) => fp.id !== item.id));
    }
  };

  return (
    <div className="flex items-center justify-center w-full gap-1 md:gap-2">
      <Button
        onClick={() => handleDecreaseQty(item)}
        variant="outline"
        size="icon"
      >
        <Minus className="h-4 w-4" />
        <span className="sr-only">Decrease quantity</span>
      </Button>
      <span className="w-8 text-center m-0 p-0">{item.quantity}</span>
      <Button
        onClick={() => handleIncreaseQty(item)}
        variant="outline"
        size="icon"
      >
        <Plus className="h-4 w-4" />
        <span className="sr-only">Increase quantity</span>
      </Button>
      {showDelete && (
        <Button
          onClick={() => handleDeleteCart(item)}
          variant="outline"
          size="icon"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Remove item</span>
        </Button>
      )}
    </div>
  );
};

export default BasketActions;
