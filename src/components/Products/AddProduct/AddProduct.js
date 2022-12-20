import { nanoid } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Form from "../../../UI/Form/Form";
import Modal from "../../../UI/Modal/Modal";
import { addProduct } from "../../../utils/redux/reducers/productsReducer";

function AddProduct({ onClose }) {
  const [newProduct, setNewProduct] = useState({});
  const [errForm, setErrForm] = useState(false);
  const dispatch = useDispatch();



  

  const submitHandler = (event) => {
    event.preventDefault();
    if (newProduct.name && newProduct.price && newProduct.quantity) {
      dispatch(
        addProduct({
          ...newProduct,
          id: nanoid(),
          price: +newProduct.price,
          quantity: +newProduct.quantity,
        })
      );
      onClose();
    } else setErrForm(true);
  };

  const changeHandler = (event) => {
    setNewProduct({ ...newProduct, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Modal onClose={onClose}>
        <h4>Add Product: </h4>
        <br></br>
        <Form changeHandler={changeHandler} submitHandler={submitHandler}>
          <div
            style={{ display: "flex", flexDirection: "column", width: "50%" }}
          >
            <label>Name:</label>
            <input name="name" type={"text"} required />{" "}
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", width: "50%" }}
          >
            <label>Price:</label>
            <input name="price" type={"number"} required />{" "}
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", width: "50%" }}
          >
            <label>Quantity:</label>
            <input name="quantity" type={"Number"} required />{" "}
          </div>
          {errForm && <div style={{ color: "red", fontSize: "14px" }}>
            All details must be entered
          </div>}
          <div className={"actions"}>
            <button onClick={submitHandler} className={"button"}>
              Add
            </button>

            <button className={"button--alt"} onClick={onClose}>
              Close
            </button>
          </div>
        </Form>
      </Modal>
    </>
  );
}

export default AddProduct;
