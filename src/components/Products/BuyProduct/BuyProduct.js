import { nanoid } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../UI/Modal/Modal";
import { productQuantityUpdate } from "../../../utils/redux/reducers/productsReducer";
import { addPurchases } from "../../../utils/redux/reducers/purchasesReducer";
import "./BuyProduct.css";

function BuyProduct({ onClose, prod, cust, hideCartHandler }) {
  const date = new Date();
  const crrDate = `${date.getUTCDate()}/${
    date.getUTCMonth() + 1
  }/${date.getUTCFullYear()}`;
  const products = useSelector((state) => state.products);
  const [selectedProduct, setSelectedProduct] = useState(
    prod?.productId ? { id: prod?.productId, quantity: prod?.quantity } : 0
  );
  const dispatch = useDispatch();
  const [errSelect, setErrSelect] = useState({ flag: false, text: "" });

  const handleChangeProduct = (event) => {
    setSelectedProduct(products.find((x) => event.target.value === x.id));
    setErrSelect({ flag: false, text: "" });
    event.target.value !== "0"
      ? setErrSelect({ flag: false, text: "" })
      : setErrSelect({ flag: true, text: "Must Selected Product" });
  };

  const buyProduct = () => {
    if (selectedProduct) {
      if (selectedProduct?.quantity > 0) {
        dispatch(
          addPurchases({
            date: crrDate,
            productId: selectedProduct.id,
            customerId: cust?.customerId,
            id: nanoid(),
          })
        );
        dispatch(productQuantityUpdate(selectedProduct.id));
        hideCartHandler();
      } else setErrSelect({ flag: true, text: "Out Of Stock" });
    } else setErrSelect({ flag: true, text: "Must Selected Product" });
  };

  return (
    <Modal onClose={onClose}>
      <h4>Add product to customer: {cust?.name}</h4>
      <br></br>
      <label>Select Product: </label>
      <select
        style={{
          padding: "10px 10px",
          border: errSelect.flag && "solid red 2px",
        }}
        value={selectedProduct?.id}
        onChange={handleChangeProduct}
      >
        <option value={"0"}></option>

        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
      </select>
      {errSelect.flag && (
        <div style={{ color: "red", fontSize: "14px" }}> {errSelect.text} </div>
      )}

      <div className={"actions"}>
        <button className={"button"} onClick={buyProduct}>
          Buy
        </button>
        <button className={"button--alt"} onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
}

export default BuyProduct;
