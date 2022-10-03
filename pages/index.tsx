import React, { useEffect } from "react";
import { FooterBanner, HeroBanner, Product } from "../components";
import { GetServerSideProps } from "next";
import { client } from "../lib/client";
import { IBanner, IFooterLinks, IProduct } from "../lib/interfaces";
import { useStateContext } from "../context/StateContext";

interface Props {
  products: IProduct[];
  banner: IBanner[];
  footerLinks: IFooterLinks[];
}

const Home: React.FC<Props> = ({ products, banner, footerLinks }) => {
  const { setfooterLinks } = useStateContext();

  useEffect(() => {
    setfooterLinks(footerLinks);
  }, [footerLinks]);

  return (
    <>
      <HeroBanner heroBanner={banner?.[0]} />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products?.map((product: IProduct) => (
          <Product key={product?._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={banner?.[0]} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const productsQuery = '*[_type == "product"]';
  const products = await client.fetch(productsQuery);

  const bannerQuery = '*[_type == "banner"]';
  const banner = await client.fetch(bannerQuery);

  const footerQuery = '*[_type == "footer"]';
  const footerLinks = await client.fetch(footerQuery);

  return {
    props: {
      products,
      banner,
      footerLinks,
    },
  };
};

export default Home;
