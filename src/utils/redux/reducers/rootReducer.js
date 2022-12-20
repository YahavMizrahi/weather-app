import { combineReducers } from "@reduxjs/toolkit";

import customers from "./customersReducer";
import products from "./productsReducer";
import purchases from "./purchasesReducer";
const rootReducer = combineReducers({
  customers,
  products,
  purchases,
});

export default rootReducer;
