//Здесь будут все типы и интерфейсы

export interface Data {
    data: string;
}

export interface CardItem{
    _id:number;
    _title:string;
    _category:string;
    _brand:string;
    _price:number;
    _discountPercentage:string;
    _rating:string;
    _stock:string;
    _thumbnail:string;
    _images: string[];
}


export interface DataObject {
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

export interface DataValueEachOfCategory {
    [key: string]: number;
}

export default CardItem;