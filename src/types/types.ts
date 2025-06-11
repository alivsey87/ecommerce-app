export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

export type Category = string;

export interface Cart {
    id: number;
    userId: number;
    products: Product[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
    id?: string;
    name: string;
    age: number;
    email: string;
}

