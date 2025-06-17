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

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface User {
    uid: string;
    email: string;
    name?: string;
}

