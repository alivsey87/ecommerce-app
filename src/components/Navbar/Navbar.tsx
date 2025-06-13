import React from "react";
import "./navbar.css";
import CartIcon from "../Icons/CartIcon";

type NavbarProps = {
  cartCount: number;
  onCartClick: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick }) => {
  return (
    <nav className="navbar">
      <div className="navbar-dropdown">
        <button className="navbar-dropdown-toggle" tabIndex={0}>
          ☰
        </button>
        <div className="navbar-dropdown-menu"></div>
      </div>
      <div className="navbar-right">
        <div
          className="cart-icon-wrapper"
          onClick={onCartClick}
          title="View Cart"
        >
          <CartIcon />
          <span className="cart-badge">{cartCount}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
