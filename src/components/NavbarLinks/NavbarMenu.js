import React from "react";
import Navbar from "../../UI/stickyNavbar/Navbar";
import { NavLink } from "react-router-dom";

function NavbarMenu() {
  const navLinkActive = ({ isActive }) => {
    return isActive ? "is-active" : "";
  };

  return (
    <Navbar textTitle={"Product🛒Customer"}>
      <li>
        <NavLink className={navLinkActive} to="products">
          Products
        </NavLink>
      </li>
      <li>
        <NavLink className={navLinkActive} to="customers">
          Customers
        </NavLink>
      </li>
      <li>
        <NavLink className={navLinkActive} to="purchases">
          Purchases
        </NavLink>
      </li>
    </Navbar>
  );
}

export default NavbarMenu;
