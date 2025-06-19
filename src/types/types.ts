export interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
    isFirestoreProduct?: boolean;
}

export type Category = string;

export interface CartItem {
    productId: string;
    quantity: number;
}

export interface User {
    uid: string;
    email: string;
    name?: string;
}

export interface Order {
    id?: string;
    userId: string;
    items: CartItem[];
    total: number;
    createdAt: Date;
}

