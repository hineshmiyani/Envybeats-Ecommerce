import React, { useEffect } from "react";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { BsBagCheckFill } from "react-icons/bs";
import { useStateContext } from "../context/StateContext";
import { runFireworks } from "../lib/utils";
import { client } from "../lib/client";
import { ISuccessPageData } from "../lib/interfaces";

interface Props {
  successPageData: ISuccessPageData[];
}

const Success: React.FC<Props> = ({ successPageData }) => {
  console.log("successPageData", successPageData);
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill size={60} />
        </p>
        <h2>{successPageData?.[0]?.largeText}</h2>
        <p className="email-msg">{successPageData?.[0]?.smallText1}</p>
        <p className="description">
          {successPageData?.[0]?.smallText2}
          <a
            className="email"
            href={`mailto:${successPageData?.[0]?.contectEmail}`}
          >
            {successPageData?.[0]?.contectEmail}
          </a>
        </p>
        <Link href="/">
          <button type="button" className="btn" style={{ width: "300px" }}>
            {successPageData?.[0]?.buttonText}
          </button>
        </Link>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const query = '*[_type == "success"]';
  const successPageData = await client.fetch(query);

  return {
    props: {
      successPageData,
    },
  };
};

export default Success;
