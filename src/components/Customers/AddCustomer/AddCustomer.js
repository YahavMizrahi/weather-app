import { nanoid } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Form from "../../../UI/Form/Form";
import Modal from "../../../UI/Modal/Modal";
import { addCustomer } from "../../../utils/redux/reducers/customersReducer";

function AddCustomer({ onClose }) {
  const [newCustomer, setNewCustomer] = useState({});
  const [errForm, setErrForm] = useState(false);
  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();
    if (newCustomer.firstName && newCustomer.lastName && newCustomer.city) {
      dispatch(
        addCustomer({
          ...newCustomer,
          id: nanoid(),
        })
      );
      onClose();
    } else setErrForm(true);
  };

  const changeHandler = (event) => {
    setNewCustomer({ ...newCustomer, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Modal onClose={onClose}>
        <h4>Add Customer: </h4>
        <br></br>
        <Form changeHandler={changeHandler} submitHandler={submitHandler}>
          <div
            style={{ display: "flex", flexDirection: "column", width: "50%" }}
          >
            <label>First Name:</label>
            <input name="firstName" type={"text"} required />{" "}
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", width: "50%" }}
          >
            <label>Last Name:</label>
            <input name="lastName" type={"text"} required />{" "}
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", width: "50%" }}
          >
            <label>City:</label>
            <input name="city" type={"text"} required />{" "}
          </div>
          {errForm && (
            <div style={{ color: "red", fontSize: "14px" }}>
              All details must be entered
            </div>
          )}
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

export default AddCustomer;
