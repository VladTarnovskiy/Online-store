export interface CardItem {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  amount?: number;
  totalPrice?: number;
  inBasket?: boolean;
}

interface Products {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface Data {
  products: Array<Products>;
  total: number;
  skip: number;
  limit: number;
}

export interface DataValueEachOfCategory {
  [key: string]: number;
}

export const enum PageIds {
  MainPage = '#',
  BasketPage = '#basket-page',
  Product = '#product-details',
  ErrorPage = '#erorr-page',
}
