import React, { useState } from "react";
import "./CustomersPurchasesProduct.css";
import { paginationData } from "../../../utils/utils";
import Button from "../../../UI/Button/Button";
import Pagination from "../../../UI/Pagination/Pagination";
import BuyProduct from "../BuyProduct/BuyProduct";
import { useNavigate } from "react-router-dom";

function CustomersPurchasesProduct({ list, prod, cust }) {
  const [page, setPage] = useState(1);
  const updatePage = (x) => setPage(x);
  const [cartIsShown, setCartIsShown] = useState(false);
  const [selected, setSelected] = useState(cust || prod);
  const navigate = useNavigate();

  const showCartHandler = (p) => {
    setCartIsShown(true);
    setSelected(p?.customerId || p?.productId);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <>
      {list.length > 0 ? (
        <div className="purchases-prod-list-container">
          {list && prod && (
            <h3 className="header-purchases">
              Customers that bought this product
            </h3>
          )}
          {list && cust && (
            <>
              <h3 className="header-purchases">
                Products bought by the customer
              </h3>
            </>
          )}

          <table className="table-list">
            <thead className="header-table">
              <tr className="header-table-row">
                <th>NAME</th>
                <th>DATE</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="body-table">
              {paginationData(list, page, 4).map((c, index) => {
                return (
                  <tr
                    key={index}
                    className={`
                  body-table-row  ${index % 2 === 1 ? "odd-row" : "even-row"}`}
                  >
                    <td
                      onClick={() =>
                        navigate(
                          c?.productId
                            ? `/products/edit/${c.productId}`
                            : `/customers/edit/${c.customerId}`
                        )
                      }
                      style={{cursor:'pointer'}}
                    >
                      {c.name}
                    </td>
                    <td>{c.date}</td>
                    <td>
                      <Button
                        text="Buy Product"
                        color="#061A40"
                        background="white"
                        clickHandler={() => {
                          showCartHandler(c);
                          setSelected(c);
                        }}
                        padding={"2px 20px"}
                        borderRadius={"20px"}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            amount={4}
            list={list}
            page={page}
            updatePage={updatePage}
          />
        </div>
      ) : (
        <div className="purchases-prod-list-container">
          {list && prod && (
            <h3 className="header-purchases">
              No one bought this product yet.
            </h3>
          )}
          {list && cust && (
            <>
              <h3 className="header-purchases">
                Customer's product cart is empty
              </h3>
              <Button
                text="Buy Product"
                color="#061A40"
                background="white"
                clickHandler={() => {
                  showCartHandler(selected);
                  setSelected(selected);
                }}
                padding={"2px 20px"}
                borderRadius={"20px"}
                width={"50%"}
              />
            </>
          )}
        </div>
      )}

      {cartIsShown && (
        <BuyProduct
          onClose={hideCartHandler}
          prod={prod || selected}
          hideCartHandler={hideCartHandler}
          cust={cust || selected}
        />
      )}
    </>
  );
}

export default CustomersPurchasesProduct;
