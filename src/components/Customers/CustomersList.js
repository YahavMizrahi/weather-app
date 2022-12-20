import React from "react";
import { useSelector } from "react-redux";
import Customer from "./Customer";
import {  Outlet } from "react-router-dom";

function CustomersList() {
  const customers = useSelector((state) => state.customers);
  
  return (
    <div className="products-list">
      {customers.map((customer) => (
        <Customer
          key={customer.id}
          fname={customer.firstName}
          lname={customer.lastName}
          city={customer.city}
          id={customer.id}
        />
      ))}
      <Outlet />
    </div>
  );
}

export default React.memo(CustomersList);
