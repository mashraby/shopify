"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowRight } from "lucide-react";

const carouselItems = [
  {
    image: "/headphones.jpg",
    title: "Headphones",
    description: "The most reliable and best quality headphones.",
    cta: "Shop Now",
    link: "#products",
  },
  {
    image: "/apple-gadjets.jpg",
    title: "Apple gadjets",
    description: "Original and quality apple products.",
    cta: "Explore",
    link: "#products",
  },
  {
    image: "/laptops.jpg",
    title: "Laptops",
    description: "The best laptops",
    cta: "View Deals",
    link: "#products",
  },
];

export default function HeroCarousel() {
  return (
    <section className="w-full">
      <Carousel className="w-full">
        <CarouselContent>
          {carouselItems.map((item, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-[60vh] min-h-[400px] max-h-[600px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="text-center text-white p-6 max-w-2xl">
                    <h2 className="text-4xl font-bold mb-4">{item.title}</h2>
                    <p className="text-xl mb-6">{item.description}</p>
                    <Button asChild size="lg">
                      <Link
                        href={item.link}
                        className="inline-flex items-center"
                      >
                        {item.cta}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </section>
  );
}
