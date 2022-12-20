import React, { useEffect, useState } from "react";
import Card from "../../UI/Card/Card";
import { useSelector } from "react-redux";
import CustomersPurchasesProduct from "./CustomersPurchasesProduct/CustomersPurchasesProduct";
import { useNavigate } from "react-router-dom";

function Product({ price, quantity, name, id, onClickButton }) {
  var randomColor = Math.floor(Math.random() * 16777215).toString(16);
  const customers = useSelector((state) => state.customers);
  const purchases = useSelector((state) => state.purchases);
  const [customersPurchasesProd, setCustomersPurchasesProd] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getCustomersPurchases = () => {
      const customersId = purchases.filter((p) => p.productId === id);
      let customerPurchase = [];
      customersId.forEach((customerId) => {
        customers.forEach((customer) => {
          if (customer.id === customerId.customerId)
            customerPurchase = [
              ...customerPurchase,
              {
                name: customer.firstName + " " + customer.lastName,
                date: customerId.date,
                customerId: customer.id,
              },
            ];
        });
      });
      setCustomersPurchasesProd(customerPurchase);
    };
    getCustomersPurchases();
  }, [customers, id, purchases]);

  return (
    <Card>
      <div className="item-container">
        <div
          className="name-item"
          onClick={() => navigate(`/products/edit/${id}`)}
          style={{ cursor: "pointer" }}
        >
          <span
            style={{
              backgroundColor: `#${randomColor}`,
            }}
            className="firstChar-name "
          >
            {name.slice(0, 3).toUpperCase()}
          </span>
          <h1>{name}</h1>
        </div>
        <div className="data-item">
          <span>Price: {price}$</span>
          <span>Quantity: {quantity}</span>
        </div>
      </div>
      <CustomersPurchasesProduct
        list={customersPurchasesProd}
        columns={["Name", "Date", ""]}
        onClickButton={onClickButton}
        prod={{ productId: id, name: name, quantity: quantity }}
      />
    </Card>
  );
}

export default React.memo(Product);
