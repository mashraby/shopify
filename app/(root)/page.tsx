import Hero from "@/components/shared/hero";
import Products from "./components/products";
import { getAllProducts } from "@/lib/services/products.service";

async function Home() {
  const products = await getAllProducts();

  return (
    <>
      <Hero />
      <Products products={products} />
    </>
  );
}

export default Home;
