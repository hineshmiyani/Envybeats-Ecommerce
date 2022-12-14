import { Dispatch, SetStateAction } from "react";

export interface IProduct {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  details: string;
  image: {
    _key: string;
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  }[];
  name: string;
  price: number;
  slug: {
    _type: string;
    current: string;
  };
  quantity?: number;
}

export interface IBanner {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  buttonText: string;
  desc: string;
  discount: string;
  image: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  largeText1: string;
  largeText2: string;
  midText: string;
  product: string;
  saleTime: string;
  smallText: string;
}

export interface IContextType {
  showCart: boolean;
  setShowCart: Dispatch<SetStateAction<boolean>>;
  cartItems: any;
  totalPrice: number;
  totalQuantities: number;
  qty: number;
  footerLinks: any;
  setfooterLinks: Dispatch<SetStateAction<any[] | undefined>>;
  setQty: Dispatch<SetStateAction<number>>;
  addToCart: (product: IProduct, quantity: number) => void;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
  toggleCartItemQunatity: (id: string, value: string) => void;
  removeItemFromCart: (product: IProduct) => void;
  setCartItems: Dispatch<SetStateAction<(IProduct | any)[]>>;
  setTotalPrice: Dispatch<SetStateAction<number>>;
  setTotalQuantities: Dispatch<SetStateAction<number>>;
}
export interface ISuccessPageData {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  buttonText: string;
  contectEmail: string;
  largeText: string;
  smallText1: string;
  smallText2: string;
}

export interface IProvider {
  id: "facebook" | "google" | string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  className?: string | any;
  icon?: JSX.Element;
}

export interface IFooterLinks {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  instagram: string;
  twitter: string;
}
