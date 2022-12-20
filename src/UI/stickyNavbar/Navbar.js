import React, { useState } from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

function Navbar({ children, baseColor, stickColor, linksColor, textTitle }) {
  const [active, setActive] = useState("");

  const fixNav = () => {
    window.scrollY >= 60 ? setActive("active") : setActive("");
  };
  window.addEventListener("scroll", fixNav);

  return (
    <nav className={`nav ${active}`} onScroll={() => fixNav()}>
      <div className="container">
        <h1 className="logo">
          <Link className="link" to="">
            {textTitle}
          </Link>
        </h1>
        <ul className="menu">{children}</ul>
        <span>
          <NavLink to="PURCHASES">
            <h1
              style={{
                fontSize: "35px",
                background: "white",
                borderRadius: "50%",
                padding: "4px",
                margin: "0",
              }}
            >
              👤
            </h1>
          </NavLink>
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
