import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EditCustomer from "./components/Customers/EditCustomer";
import NavbarMenu from "./components/NavbarLinks/NavbarMenu";
import EditProduct from "./components/Products/EditProduct/EditProduct";
import CustomersPage from "./pages/CustomersPage";
import ProductsPage from "./pages/ProductsPage";
import PurchasesPage from "./pages/PurchasesPage";

function App() {
  return (
    <div className="App">
      <Router>
        <NavbarMenu />
        <div className="app-container">
          <Routes>
            <Route exact path="/" element={<></>} />
            <Route path="/customers" element={<CustomersPage />}>
              <Route path="edit/:id" element={<EditCustomer />} />
            </Route>
            <Route path="/products" element={<ProductsPage />}>
              <Route path="edit/:id" element={<EditProduct />} />
            </Route>

            <Route path="/purchases" element={<PurchasesPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
