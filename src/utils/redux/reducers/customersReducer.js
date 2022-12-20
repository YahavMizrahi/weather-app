import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    firstName: "Yahav",
    lastName: "Mizrahi",
    city: "Rehovot",
  },
  {
    id: "2",
    firstName: "Yaniv",
    lastName: "Arad",
    city: "Tel-Aviv",
  },
];

const customers = createSlice({
  name: "customers",
  initialState,
  reducers: {
    addCustomer(state, action) {
      return state.concat(action.payload);
    },
    updateCustomer(state, action) {
      let customers = [...state];
      customers = customers.map((customer) => {
        if (customer.id === action.payload.id)
          return action.payload;
        else return customer;
      });
      return customers;
    },
    deleteCustomer(state, action) {
      return state.filter((user) => action.payload !== user.id);
    },
  },
});

export const { addCustomer, updateCustomer, deleteCustomer } =
  customers.actions;

export default customers.reducer;
