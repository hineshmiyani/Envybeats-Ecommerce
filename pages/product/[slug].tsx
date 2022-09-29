/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { client, urlFor } from "../../lib/client";
import { IContextType, IProduct } from "../../lib/interfaces";
import {
  AiFillStar,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
} from "react-icons/ai";
import { Product } from "../../components";
import { useStateContext } from "../../context/StateContext";

interface Props {
  product: IProduct;
  products: IProduct[];
}

const ProductDetails: React.FC<Props> = ({ product, products }) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  const { qty, increaseQuantity, decreaseQuantity, addToCart, setShowCart } =
    useStateContext();

  const buyNow = () => {
    addToCart(product, qty);
    setShowCart(true);
  };

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image?.[index])?.url()}
              className="product-detail-image"
              alt="main-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                src={urlFor(item).url()}
                alt="small-image"
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                key={item?._key}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">₹ {price}</p>
          <div className="quantity">
            <h3>Quantity :</h3>
            <p className="quantity-desc">
              <span
                className="minus"
                onClick={() => {
                  decreaseQuantity();
                }}
              >
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span
                className="plus"
                onClick={() => {
                  increaseQuantity();
                }}
              >
                <AiOutlinePlus />
              </span>
            </p>
          </div>

          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => {
                addToCart(product, qty);
              }}
            >
              Add to Cart
            </button>
            <button
              type="button"
              className="buy-now"
              onClick={() => {
                buyNow();
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item?._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `*[_type == "product"]{
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);

  const paths = products.map((product: IProduct) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const singleProductquery = `*[_type== "product" && slug.current == '${params?.slug}'][0]`;
  const product = await client.fetch(singleProductquery);

  const productsQuery = `*[_type == "product"]`;
  const products = await client.fetch(productsQuery);

  return {
    props: {
      product,
      products,
    },
  };
};

export default ProductDetails;
