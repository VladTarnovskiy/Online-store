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

export interface Data {
  products: {
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
  }[];
  total: number;
  skip: number;
  limit: number;
}

export interface DataValueEachOfCategory {
  [key: string]: number;
}

export const enum PageIds {
  MainPage = 'main-page',
  BasketPage = 'basket-page',
  Product = 'product',
  ErrorPage = 'erorr-page',
}
