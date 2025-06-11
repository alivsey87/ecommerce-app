import type { CartItem, User } from "./types";


export interface Order {
    id: number;
    items: CartItem[];
    user: User;
    total: number;
    createdAt: Date;
}
