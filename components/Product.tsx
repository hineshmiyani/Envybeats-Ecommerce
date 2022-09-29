import React from "react";
import Link from "next/link";
import { IProduct } from "../lib/interfaces";
import { urlFor } from "../lib/client";
import Image from "next/image";

interface IProductProps {
  product: IProduct;
}

const Product: React.FC<IProductProps> = ({
  product: { image, name, slug, price },
}) => {
  return (
    <div>
      <Link href={`/product/${slug?.current}`}>
        <div className="product-card">
          <Image
            src={urlFor(image?.[0]).url()}
            width="250"
            height="250"
            alt="product"
            className="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-name">₹ {price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
