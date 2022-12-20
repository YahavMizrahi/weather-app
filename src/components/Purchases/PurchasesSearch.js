import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../UI/Button/Button";
import { paginationData } from "../../utils/utils";
import Pagination from "../../UI/Pagination/Pagination";
import { useNavigate } from "react-router-dom";


export const PurchasesSearch = () => {
  const customers = useSelector((state) => state.customers);
  const products = useSelector((state) => state.products);
  const purchases = useSelector((state) => state.purchases);
  const [page, setPage] = useState(1);

  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [searchRes, setSearchRes] = useState([]);
  const navigate = useNavigate();

  const updatePage = (x) => setPage(x);

  const handleChangeCustomer = (event) => {
    setSelectedCustomer(event.target.value);
  };

  const handleChangeProduct = (event) => {
    setSelectedProduct(event.target.value);
  };

  const handleChangeDate = (event) => {
    let date = new Date(event.target.value).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    date = date === "Invalid Date" ? "" : date;
    setSelectedDate(date);
  };

  const searchPurchases = () => {
    const res = purchases.filter(
      (p) =>
        (selectedProduct === "" || p.productId === selectedProduct) &&
        (selectedCustomer === "" || p.customerId === selectedCustomer) &&
        (selectedDate === "" || p.date === selectedDate)
    );

    const listTable = res.map((s) => {
      const customer = customers.find((c) => {
        if (c.id === s.customerId) {
          return c.firstName;
        }
        return "";
      });

      const product = products.find((p) => {
        if (p.id === s.productId) return p.name;
        return "";
      });
      return {
        name: `${customer.firstName} ${customer.lastName}`,
        customerId:customer.id,
        product: product.name,
        productId:product.id,
        date: s.date,
      };
    });
    setPage(1);
    setSearchRes(listTable);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" ,gap:'30px'}}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "30%",
        }}
      >
        <label>Select Customer: </label>
        <select
          style={{ padding: "10px 10px" }}
          value={selectedCustomer}
          onChange={handleChangeCustomer}
        >
          <option></option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.firstName} {customer.lastName}
            </option>
          ))}
        </select>
        <label>Select Product: </label>
        <select
          style={{ padding: "10px 10px" }}
          value={selectedProduct}
          onChange={handleChangeProduct}
        >
          <option></option>

          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
        <label>Date:</label>
        <input
          style={{ padding: "10px 10px" }}
          type="date"
          onChange={handleChangeDate}
        />
        <br></br>
        <Button
          background={"black"}
          text={"Search"}
          colorText={"white"}
          clickHandler={searchPurchases}
          padding={"20px"}
          borderRadius={"10px"}
        />
      </div>
      {searchRes.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <table style={{ width: "100%" }}>
            <thead className="header-table">
              <tr className="header-table-row">
                <th style={{ padding: "10px" }}>NAME</th>
                <th>Product</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody className="body-table">
              {paginationData(searchRes, page, 10).map((c, index) => {
                
                return (
                  <tr
                    key={index}
                    className={`
                  body-table-row  ${index % 2 === 1 ? "odd-row" : "even-row"}`}
                  >
                    <td
                      onClick={() =>
                        navigate(`/customers/edit/${c.customerId}`)
                      }
                      style={{ padding: "10px 25px", cursor: "pointer" }}
                    >
                      {c.name}
                    </td>
                    <td
                      onClick={() => navigate(`/products/edit/${c.productId}`)}
                      style={{ padding: "10px 25px", cursor: "pointer" }}
                    >
                      {c.product}
                    </td>
                    <td style={{ padding: "10px 25px" }}>{c.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <br></br>
          <Pagination
            amount={10}
            list={searchRes}
            page={page}
            updatePage={updatePage}
          />
        </div>
      )}
    </div>
  );
};

export default PurchasesSearch;
