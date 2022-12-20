import React from "react";
import { useSelector } from "react-redux";
import Product from "./Product";
import "./Products.css";
import {  Outlet } from "react-router-dom";

export const ProductsList = ({ onShowModal }) => {
  const products = useSelector((state) => state.products);
  return (
    <div className="products-list">
      {products.map((product) => (
        <Product
          key={product.id}
          name={product.name}
          quantity={product.quantity}
          price={product.price}
          id={product.id}
          onClickButton={onShowModal}
        />
      ))}
      <Outlet />
    </div>
  );
};

export default React.memo(ProductsList);
