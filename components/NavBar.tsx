import React, { useState } from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { AiOutlineShopping } from "react-icons/ai";
import { useStateContext } from "../context/StateContext";
import Cart from "./Cart";

const NavBar = () => {
  const { data: session } = useSession();
  console.log({ session });
  const [showSignOutBtn, setShowSignOutBtn] = useState(false);

  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Envy Beats</Link>
      </p>

      <div style={{ display: "flex", gap: "20px" }}>
        {/* Sign In */}
        {session ? (
          <div
            onMouseLeave={() => setShowSignOutBtn(false)}
            onMouseEnter={() => setShowSignOutBtn(true)}
          >
            <p>{session?.user?.name}</p>
            {showSignOutBtn && (
              <button onClick={() => signOut()}>Sign Out</button>
            )}
          </div>
        ) : (
          <div>
            <button onClick={() => signIn()}>Sign In</button>
          </div>
        )}

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
