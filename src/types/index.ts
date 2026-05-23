import type { Dispatch, SetStateAction } from "react";

export interface Product {
    id: number;
    title: string;
    price: number;
    description?: string;
    category: string;
    image: string;
    thumbnail?: string;
    rating: number;
    brand: string;
}
export interface Coupon {
    code: string;
    discountType:string;
    discountValue: number 
    minCartValue: number
}
export type ProductList = Product[];

export type Cart = Record<string, number>;

export interface UserProfile {
  name: string;
  email: string;
  profilePic?: string ;
  cart: Record<string, number>; 
}

export interface User {
  user: UserProfile | undefined;
  setUser: Dispatch<SetStateAction<UserProfile | undefined>>;
}


export interface AuthResponse {
  message: string;
  token: string;
  user: UserProfile;
}

export interface Alert {
  type: "success" | "error" | "warning";
  message: string | undefined;
}
export interface AlertContextType {
  alert: Alert | undefined;
  setAlert: Dispatch<SetStateAction<Alert | undefined>>
  removeAlert: () => void;
}
export interface PathContextType {
    path: string;
    setPath: (path: string) => void;
}

export interface CartContextType {
    cart: Cart;
    setCart: Dispatch<SetStateAction<Cart>>;
    updateCartProduct: (productId: number, number: number) => void;
    removeCartProduct: (Id: number) => void;
    saveCart: (cart: Cart) => void;
}
export interface AllData {
  products: ProductList;
  total: number;
  skip: number;
  limit: number;
}