import React, { useState } from "react";
import AddCustomer from "../components/Customers/AddCustomer/AddCustomer";
import CustomersList from "../components/Customers/CustomersList";
import Button from "../UI/Button/Button";

function CustomersPage() {


  const [ModalIsShown, setModalIsShown] = useState(false);

  const hideCartHandler = () => {
    setModalIsShown(false);
  };

  const showCartHandler = (p) => {
    setModalIsShown(true);
  };
  return (
    <>
      <Button
        background="#061A40"
        colorText="white"
        padding="10px"
        clickHandler={showCartHandler}
        width={"auto"}
        text={"Add New Customer"}
        borderRadius="10px"
      />
      
      {ModalIsShown && <AddCustomer onClose={hideCartHandler} />}
      <CustomersList />
    </>
  );
}

export default CustomersPage;
