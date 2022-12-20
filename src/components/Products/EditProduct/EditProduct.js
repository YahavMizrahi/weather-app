import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Form from "../../../UI/Form/Form";
import Modal from "../../../UI/Modal/Modal";
import { deleteProduct, updateProduct } from "../../../utils/redux/reducers/productsReducer";

function EditProduct() {
  const navigate = useNavigate();
  const params = useParams();
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    quantity: "",
  });
  const [errForm, setErrForm] = useState(false);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const submitHandler = (event) => {
    event.preventDefault();
    if (newProduct.name && newProduct.price && newProduct.quantity) {
      dispatch(
        updateProduct({
          ...newProduct,
          price: +newProduct.price,
          quantity: +newProduct.quantity,
        })
      );
      navigate(window.location.pathname.split("/edit")[0]);
    } else setErrForm(true);
  };

  useEffect(() => {
    const product = products.find((prod) => prod.id === params.id);
    setNewProduct({ ...product });
  }, [params.id, products]);

  const changeHandler = (event) => {
    setNewProduct({ ...newProduct, [event.target.name]: event.target.value });
  };


  const deleteHandler = (id) => {
    dispatch(deleteProduct(id))
  }

  
  return (
    <Modal onClose={() => navigate(window.location.pathname.split("/edit")[0])}>
      Edit Product
      <Form changeHandler={changeHandler} submitHandler={submitHandler}>
        <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
          <label>Name:</label>
          <input
            defaultValue={newProduct?.name}
            name="name"
            type={"text"}
            required
          />{" "}
        </div>
        <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
          <label>Price:</label>
          <input
            defaultValue={newProduct?.price}
            name="price"
            type={"number"}
            required
          />{" "}
        </div>
        <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
          <label>Quantity:</label>
          <input
            defaultValue={newProduct?.quantity}
            name="quantity"
            type={"Number"}
            required
          />{" "}
        </div>
        {errForm && (
          <div style={{ color: "red", fontSize: "14px" }}>
            All details must be entered
          </div>
        )}
        <div className={"actions"}>
          <button onClick={submitHandler} className={"button"}>
            Edit
          </button>
          <button
            className={"button--alt"}
            onClick={() => deleteHandler(newProduct.id)}
          >
            Delete
          </button>
          <button
            className={"button--alt"}
            onClick={() => navigate(window.location.pathname.split("/edit")[0])}
          >
            Close
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default EditProduct;
