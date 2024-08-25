import AddCartBtn from "@/components/shared/addcartbtn";
import ProductCard from "@/components/shared/product-card";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  getProductsWithCategory,
  getSingleProduct,
} from "@/lib/services/products.service";
import Image from "next/image";

interface SingleProductProps {
  params: {
    productId: string | number;
  };
}

async function SingleProduct({ params: { productId } }: SingleProductProps) {
  const singleProduct = await getSingleProduct(productId);
  const { id, title, description, price, image, category } = singleProduct;

  const productsWithCategory = await getProductsWithCategory(category);
  const filteredProducts = productsWithCategory?.filter((fp) => fp.id !== id);

  return (
    <>
      <div className="mt-[80px] container">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/#products">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Single Product</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
        <div className="grid gap-4">
          <Image
            src={image}
            alt="Product Image"
            width={400}
            height={500}
            className="object-contain border w-full rounded-lg overflow-hidden"
          />
        </div>
        <div className="grid gap-4 md:gap-10 items-start">
          <div className="grid gap-4">
            <h1 className="font-bold text-3xl lg:text-4xl">{title}</h1>
            <div>
              <p>{description}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-0.5">
                <Badge variant="secondary">{category}</Badge>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold">${price}</div>
              <AddCartBtn product={singleProduct} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[40px] w-full container py-24 lg:py-32">
        <h2 className="text-3xl font-bold mb-6">Similar products</h2>

        <div className="flex flex-wrap gap-4">
          {filteredProducts?.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </>
  );
}

export default SingleProduct;
