import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "../../UI/Button/Button";
import AddProduct from "../Products/AddProduct/AddProduct";

function TotalAmount() {
  const [total, setTotal] = useState(0);
    const [ModalIsShown, setModalIsShown] = useState(false);

 const hideCartHandler = () => {
    setModalIsShown(false);
  };

    const showCartHandler = (p) => {
      setModalIsShown(true);
    };
  

  const products = useSelector((state) => state.products);
  const purchases = useSelector((state) => state.purchases);

  

  useEffect(() => {
    let totalAmount = 0;
    purchases.forEach((p) => {
      const product = products.filter((prod) => prod.id === p.productId);
      if (product) product.forEach((item) => (totalAmount += item.price));
    });
    setTotal(totalAmount);
  }, [products, purchases]);
  return (
    <div
      style={{
        background: "#dcf8fe",
        display: "flex",
        flexDirection:'column',
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        boxShadow: ' rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
        borderRadius: '10px'
        , position: "fixed"
        ,gap:'10px'
        , top: 150
        ,left:0

      }}
    >
      Total: {total}$
      <Button
        background="#061A40"
        colorText="white"
        padding="10px"
        clickHandler={showCartHandler}
        width={"auto"}
        text={"Add New Product"}
        borderRadius="10px"
      />
      {ModalIsShown && <AddProduct onClose={hideCartHandler} />}
    </div>
  );
}

export default TotalAmount;
