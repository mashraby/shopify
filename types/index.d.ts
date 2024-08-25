interface Children {
  children: React.ReactNode;
}

interface IProduct {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
  quantity: number;
  rating: {
    count: number;
    rate: number;
  };
}
