/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import toast from "react-hot-toast";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import getStripe from "../lib/getStripe";
import { IProduct } from "../lib/interfaces";

const Cart = () => {
  const cartRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQunatity,
    removeItemFromCart,
  } = useStateContext();

  const checkOutWithStripe = async () => {
    const stripe = await getStripe();
    const response: any = await fetch("/api/stripe", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();
    toast.loading("Redirecting...");
    stripe.redirectToCheckout({ sessionId: data.id });
  };

  const initializeRazorpay = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const checkOutWithRazorpay = async () => {
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    // Make API call to the serverless API
    const data = await fetch("/api/razorpay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cartItems),
    }).then((t) => t.json());
    console.log("data: ----------------------", data);
    console.log("RAZOR_PAY_KEY_ID", process.env.NEXT_PUBLIC_RAZOR_PAY_KEY_ID);
    var options = {
      key: process.env.NEXT_PUBLIC_RAZOR_PAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      name: "Envy Beats",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Thankyou for your Purchased",
      image: "",
      // callback_url: "http://localhost:3000/success",
      handler: (response: any) => {
        console.log("response : ----------------------", response);
        setShowCart(false);
        router.push("/success");
        // Validate payment at server - using webhooks is a better idea.
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your Shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item: IProduct, index: number) => (
              <div className="product" key={item?._id}>
                <img
                  src={urlFor(item?.image[0]).url()}
                  alt="cart-item"
                  className="cart-product-image"
                />
                <div className="item-desc">
                  <div className="flex-top">
                    <h5>{item?.name}</h5>
                    <h4>₹ {item?.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() =>
                            toggleCartItemQunatity(item?._id, "dec")
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num">{item?.quantity}</span>
                        <span
                          className="plus"
                          onClick={() =>
                            toggleCartItemQunatity(item?._id, "inc")
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>

                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => {
                        removeItemFromCart(item);
                      }}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>

                  {/* Subtotal */}
                  {cartItems.length >= 1 && (
                    <div className="cart-bottom">
                      <div className="total">
                        <h3>Subtotal:</h3>
                        <h3>₹ {totalPrice}</h3>
                      </div>

                      <div className="btn-container">
                        <button
                          type="button"
                          className="btn"
                          onClick={() => {
                            checkOutWithStripe();
                          }}
                        >
                          Pay with Stripe
                        </button>
                        <button
                          type="button"
                          className="btn"
                          onClick={() => {
                            checkOutWithRazorpay();
                          }}
                        >
                          Pay with Razor Pay
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
