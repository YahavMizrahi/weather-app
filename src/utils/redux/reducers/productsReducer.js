import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    name: "Oculus Quest 2",
    price: 1329,
    quantity: 50,
  },
  {
    id: "2",
    name: "iPad Air",
    price: 2629,
    quantity: 10,
  },
];

const products = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct(state, action) {
      return [...state, action.payload];
    },
    updateProduct(state, action) {
      let productsArr = [...state];
      productsArr = productsArr.map((product) => {
        if (product.id === action.payload.id) return action.payload;
        else return product;
      });
      return productsArr;
    },
    productQuantityUpdate(state, action) {
      let productsArr = [...state];
      productsArr = productsArr.map((product) => {
        if (action.payload === product.id)
          return { ...product, quantity: product.quantity - 1 };
        else return product;
      });
      return productsArr;
    },

    deleteProduct(state, action) {
      return state.filter((prod) => action.payload !== prod.id);
    },
  },
});

export const {
  addProduct,
  deleteProduct,
  updateProduct,
  productQuantityUpdate,
} = products.actions;
export default products.reducer;
