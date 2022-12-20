//Здесь будут все типы и интерфейсы

export interface Data {
    data: string;
}

export interface CardItem{
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

export default CardItem;