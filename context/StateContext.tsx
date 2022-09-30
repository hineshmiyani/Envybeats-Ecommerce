import React, { useState, useEffect, createContext, useContext } from "react";
import { toast } from "react-hot-toast";
import { Product } from "../components";
import { IContextType, IProduct } from "../lib/interfaces";

interface Props {
  children: JSX.Element;
}

const defaultValue = {
  showCart: false,
  setShowCart: () => false,
  cartItems: [],
  totalPrice: 0,
  totalQuantities: 0,
  qty: 0,
  setQty: () => {},
  addToCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  toggleCartItemQunatity: () => {},
  removeItemFromCart: () => {},
  setCartItems: () => {},
  setTotalPrice: () => {},
  setTotalQuantities: () => {},
};

const Context = createContext<IContextType>(defaultValue);
export const useStateContext = () => useContext(Context);

const StateContext: React.FC<Props> = ({ children }) => {
  const [showCart, setShowCart] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<(IProduct | any)[]>(() => {
    if (typeof window !== "undefined" && localStorage.getItem("cartItems")) {
      return JSON.parse(localStorage.getItem("cartItems") || "[]");
    }
    return [];
  });
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalQuantities, setTotalQuantities] = useState<number>(0);
  const [qty, setQty] = useState<number>(1);

  let foundProduct: IProduct | any, index: number;

  useEffect(() => {
    // update total quantity and total price from the localStorage when first time render
    if (cartItems?.length > 0) {
      let cartItemData = cartItems?.reduce(
        (prevValue, cartItems) => {
          return {
            ...prevValue,
            totalQuantities: prevValue.totalQuantities + cartItems.quantity,
            totalPrice:
              prevValue.totalPrice + cartItems.quantity * cartItems.price,
          };
        },
        {
          totalQuantities: 0,
          totalPrice: 0,
        }
      );
      setTotalPrice(cartItemData?.totalPrice);
      setTotalQuantities(cartItemData?.totalQuantities);
    }
  }, []);

  useEffect(() => {
    // update total quantity and total price when payment complete
    if (cartItems?.length === 0) {
      setTotalPrice(0);
      setTotalQuantities(0);
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add to Cart
  const addToCart = (product: IProduct, quantity: number) => {
    const checkProductInCart = cartItems.find(
      (cartItem: IProduct) => cartItem._id === product._id
    );

    setTotalQuantities(
      (prevTotalQuantities: number) => prevTotalQuantities + quantity
    );
    setTotalPrice(
      (prevTotalPrice: number) => prevTotalPrice + product.price * quantity
    );

    if (checkProductInCart) {
      // update quantity of the item that already available in cart
      const updateCartItems = cartItems.map((cartItem) => {
        if (cartItem._id === product._id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity && cartItem.quantity + quantity,
          };
        }
        return cartItem;
      });
      setCartItems(updateCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: quantity }]);
    }

    toast.success(`${quantity} ${product?.name} added to cart. `);
  };

  // Update Cart Item Quantity
  const toggleCartItemQunatity = (id: string, value: string) => {
    foundProduct = cartItems.find((cartItem: IProduct) => cartItem?._id === id);
    index = cartItems.findIndex((cartItem: IProduct) => cartItem?._id === id);

    if (value === "inc") {
      setCartItems((prevCartItems) => {
        // let updateCartItems = [...prevCartItems];
        // updateCartItems.splice(index, 1, {
        //   ...foundProduct,
        //   quantity: foundProduct?.quantity + 1,
        // });
        let updateCartItems = prevCartItems.map((item) => {
          if (item?._id === id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        return updateCartItems;
      });
      setTotalPrice(
        (prevTotalPrice: number) => prevTotalPrice + foundProduct.price
      );
      setTotalQuantities(
        (prevTotalQuantities: number) => prevTotalQuantities + 1
      );
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems((prevCartItems) => {
          // let updateCartItems = [...prevCartItems];
          // updateCartItems.splice(index, 1, {
          //   ...foundProduct,
          //   quantity: foundProduct?.quantity - 1,
          // });
          let updateCartItems = prevCartItems.map((item) => {
            if (item?._id === id) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          });
          return updateCartItems;
        });
        setTotalPrice(
          (prevTotalPrice: number) => prevTotalPrice - foundProduct.price
        );
        setTotalQuantities(
          (prevTotalQuantities: number) => prevTotalQuantities - 1
        );
      }
    }
  };

  // Remove item form Cart
  const removeItemFromCart = (product: IProduct | any) => {
    setCartItems((prevCartItems) => {
      let updateCartItems = prevCartItems.filter(
        (item) => item._id !== product?._id
      );
      return updateCartItems;
    });
    setTotalPrice(
      (prevTotalPrice: number) =>
        prevTotalPrice - product.price * product?.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities: number) => prevTotalQuantities - product?.quantity
    );
  };

  const increaseQuantity = () => {
    setQty((prevValue: number) => prevValue + 1);
  };

  const decreaseQuantity = () => {
    setQty((prevValue: number) => {
      if (prevValue <= 1) return 1;
      return prevValue - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        setQty,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        toggleCartItemQunatity,
        removeItemFromCart,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default StateContext;
