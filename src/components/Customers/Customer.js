import React from "react";
import Card from "../../UI/Card/Card";
import "../Products/Products.css";
import { useSelector } from "react-redux";
import CustomersPurchasesProduct from "../Products/CustomersPurchasesProduct/CustomersPurchasesProduct";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Customer({ fname, lname, city, id }) {
  var randomColor = Math.floor(Math.random() * 16777215).toString(16);
  const purchases = useSelector((state) => state.purchases);
  const products = useSelector((state) => state.products);
  const [customersPurchasesProd, setCustomersPurchasesProd] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getCustomersPurchases = () => {
      const productsId = purchases.filter((c) => c.customerId === id);
      let customerPurchase = [];
      productsId.forEach((productId) => {
        products.forEach((prod) => {
          if (prod.id === productId.productId)
            customerPurchase = [
              ...customerPurchase,
              {
                name: prod.name,
                date: productId.date,
                productId: prod.id,
              },
            ];
        });
      });

      setCustomersPurchasesProd(customerPurchase);
    };
    getCustomersPurchases();
  }, [products, id, purchases]);
  return (
    <Card>
      <div className="item-container">
        <div
          className="name-item"
          onClick={() => navigate(`/customers/edit/${id}`)}
          style={{ cursor: "pointer" }}
        >
          <span
            style={{
              backgroundColor: `#${randomColor}`,
            }}
            className="firstChar-name "
          >
            {(fname[0] + lname[0]).toUpperCase()}
          </span>
          <h1>
            {fname} {lname}
          </h1>
        </div>
        <div className="data-item">
          <span>City: {city}</span>
        </div>
      </div>
      <CustomersPurchasesProduct
        list={customersPurchasesProd}
        columns={["Name", "Date", ""]}
        cust={{ customerId: id, name: `${fname} ${lname}` }}
      />
    </Card>
  );
}

export default Customer;
