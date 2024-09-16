"use client";

import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useContext } from "react";
import { CartContext } from "@/contexts/cart-context";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import NoData from "@/components/shared/no-data";

export default function CartPage() {
  const { user } = useUser();
  const { products, setProducts } = useContext(CartContext) as any;

  const subtotal = products.reduce(
    (sum: number, item: { price: number; quantity: number }) =>
      sum + +item.price * +item.quantity,
    0
  );

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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        <Separator className="mb-4" />
        <div className="my-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/#products">Products</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Carts</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {products?.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6 w-full">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Cart Items</CardTitle>
              </CardHeader>

              <CardContent className="grid gap-6">
                {products.map((item: IProduct) => (
                  <Card
                    key={item.id}
                    className="flex items-center justify-between py-2 px-4"
                  >
                    <div className="flex items-center gap-4 w-full">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={60}
                        height={60}
                        className="rounded-md object-cover flex-shrink-0 md:w-[100px] md:h-[100px]"
                      />
                      <div className="flex flex-col gap-2 ml-4 md:flex-row md:justify-between w-full">
                        <div className="grid gap-1.5">
                          <h3 className="font-semibold line-clamp-1 md:line-clamp-2">
                            {item.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            ${item.price}
                          </p>
                        </div>

                        <div className="flex justify-end items-center gap-1 md:gap-2">
                          <Button
                            onClick={() => handleDecreaseQty(item)}
                            variant="outline"
                            size="icon"
                          >
                            <Minus className="h-4 w-4" />
                            <span className="sr-only">Decrease quantity</span>
                          </Button>
                          <span className="w-8 text-center m-0 p-0">
                            {item.quantity}
                          </span>
                          <Button
                            onClick={() => handleIncreaseQty(item)}
                            variant="outline"
                            size="icon"
                          >
                            <Plus className="h-4 w-4" />
                            <span className="sr-only">Increase quantity</span>
                          </Button>
                          <Button
                            onClick={() => handleDeleteCart(item)}
                            variant="outline"
                            size="icon"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove item</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>$0.00</span>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link
                  href={user ? "/checkout" : "/sign-in"}
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "w-full"
                  )}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" /> Checkout
                </Link>
              </CardFooter>
            </Card>
          </div>
        ) : (
          <NoData />
        )}
      </div>
    </div>
  );
}
