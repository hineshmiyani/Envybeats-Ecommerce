import React, { useEffect } from "react";
import { FooterBanner, HeroBanner, Product } from "../components";
import { GetServerSideProps } from "next";
import { client } from "../lib/client";
import { IBanner, IProduct } from "../lib/interfaces";
interface Props {
  products: IProduct[];
  banner: IBanner[];
}

const Home: React.FC<Props> = ({ products, banner }) => {
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

  return {
    props: {
      products,
      banner,
    },
  };
};

export default Home;
