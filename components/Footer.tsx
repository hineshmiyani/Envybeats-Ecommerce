import React from "react";
import Link from "next/link";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import { useStateContext } from "../context/StateContext";

const Footer = () => {
  const { footerLinks } = useStateContext();

  return (
    <div className="footer-container">
      <p>{new Date().getFullYear()} Envy Beats. All rights reserved</p>
      <p className="icons">
        {footerLinks?.[0]?.instagram && (
          <Link href={footerLinks?.[0]?.instagram}>
            <AiFillInstagram />
          </Link>
        )}
        {footerLinks?.[0]?.twitter && (
          <Link href={footerLinks?.[0]?.twitter}>
            <AiOutlineTwitter />
          </Link>
        )}
      </p>
    </div>
  );
};

export default Footer;
