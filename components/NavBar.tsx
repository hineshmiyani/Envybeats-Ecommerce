/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import { AiOutlineShopping } from "react-icons/ai";
import { MdOutlinePersonOutline } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { useStateContext } from "../context/StateContext";
import Cart from "./Cart";
import Image from "next/image";

const NavBar = () => {
  const { data: session } = useSession();
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
          <>
            {/* <div className="dialog-backdrop"></div> */}
            <div className="profile-dialog-ctn">
              <div className="profile-dialog">
                {session ? (
                  <>
                    <div className="profile-details">
                      {session?.user?.image ? (
                        <img
                          src={session?.user?.image}
                          width={32}
                          height={32}
                          alt="profile-img"
                        ></img>
                      ) : (
                        <FaUserCircle fontSize={34} />
                      )}
                      <div>
                        <h3>{session?.user?.name}</h3>
                        <p>{session?.user?.email}</p>
                      </div>
                    </div>
                    <button type="button" onClick={() => signOut()}>
                      SIGN OUT
                    </button>
                  </>
                ) : (
                  <>
                    <h3>Welcome</h3>
                    <p style={{ marginBottom: "10px" }}>
                      Please sign in to place orders.
                    </p>
                    <button type="button" onClick={() => signIn()}>
                      SIGN IN
                    </button>
                  </>
                )}
              </div>
            </div>
          </>
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
