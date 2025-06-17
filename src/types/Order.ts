import type { CartItem, User } from "./types";


export interface Order {
    id?: string;
    items: CartItem[];
    user: User;
    total: number;
    createdAt: Date;
}
