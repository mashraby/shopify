import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";

export default function ProductCard({
  id,
  image,
  title,
  price,
  category,
}: IProduct) {
  return (
    <Link href={"/product/" + id}>
      <Card className="w-full max-w-xs cursor-pointer hover:scale-105 transition-all hover:shadow-2xl">
        <Image
          src={image}
          width={400}
          height={250}
          alt="Product"
          className="aspect-[1.6] object-contain"
        />
        <CardHeader className="p-4 flex items-center justify-between">
          <CardTitle className="text-xl font-semibold line-clamp-1">
            {title}
          </CardTitle>
          <Badge variant="secondary">{category}</Badge>
        </CardHeader>
        <CardContent className="p-4">
          <p className="text-2xl font-semibold">${price}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
