import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Form from "../../UI/Form/Form";
import Modal from "../../UI/Modal/Modal";
import {
  deleteCustomer,
  updateCustomer,
} from "../../utils/redux/reducers/customersReducer";

function EditCustomer() {
  const navigate = useNavigate();
  const params = useParams();
  const [newCustomer, setNewCustomer] = useState({
    firstName: "",
    lastName: "",
    city: "",
  });
  const [errForm, setErrForm] = useState(false);
  const customers = useSelector((state) => state.customers);
  const dispatch = useDispatch();
  const submitHandler = (event) => {
    event.preventDefault();
    if (newCustomer.firstName && newCustomer.lastName && newCustomer.city) {
      dispatch(
        updateCustomer({
          ...newCustomer,
        })
      );
      navigate(window.location.pathname.split("/edit")[0]);
    } else setErrForm(true);
  };
  useEffect(() => {
    const customer = customers.find((cust) => cust.id === params.id);
    setNewCustomer({ ...customer });
  }, [params, customers]);

  const changeHandler = (event) => {
    setNewCustomer({ ...newCustomer, [event.target.name]: event.target.value });
  };

  const deleteHandler = (id) => {
    dispatch(deleteCustomer(id));
  };
  return (
    <Modal
      onClose={() =>
        navigate(window.location.pathname.split("/edit")[0].split("/edit")[0])
      }
    >
      EditCustomer
      <Form changeHandler={changeHandler} submitHandler={submitHandler}>
        <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
          <label>First Name:</label>
          <input
            defaultValue={newCustomer.firstName}
            name="firstName"
            type={"text"}
            required
          />{" "}
        </div>
        <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
          <label>Last Name:</label>
          <input
            defaultValue={newCustomer.lastName}
            name="lastName"
            type={"text"}
            required
          />{" "}
        </div>
        <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
          <label>City:</label>
          <input
            defaultValue={newCustomer.city}
            name="city"
            type={"text"}
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
            onClick={() => deleteHandler(newCustomer.id)}
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

export default EditCustomer;
