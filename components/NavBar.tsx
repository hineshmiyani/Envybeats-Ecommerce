/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { AiOutlineShopping } from "react-icons/ai";
import { MdOutlinePersonOutline } from "react-icons/md";
import { useStateContext } from "../context/StateContext";
import Cart from "./Cart";
import UserProfileDialog from "./UserProfileDialog";

const NavBar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const router = useRouter();

  if (router.route.includes("signin")) {
    return (
      <div className="navbar-container">
        <p className="logo">
          <Link href="/">Envy Beats</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Envy Beats</Link>
      </p>

      <div style={{ display: "flex", gap: "20px" }}>
        {/* Sign In */}
        {/* Profile  */}
        <div className="profile-icon">
          <MdOutlinePersonOutline />
          <UserProfileDialog />
        </div>

        {/* Cart */}
        <button
          type="button"
          className="cart-icon"
          onClick={() => setShowCart(true)}
        >
          <AiOutlineShopping />
          <span className="cart-item-qty">{totalQuantities}</span>
        </button>
      </div>
      {showCart && <Cart />}
    </div>
  );
};

export default NavBar;
