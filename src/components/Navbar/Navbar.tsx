import React, { useState } from "react";
import "./navbar.css";
import CartIcon from "../Icons/CartIcon";
import { Link, useNavigate } from "react-router-dom";
import { type RootState } from "../../app/store";
import { useSelector } from "react-redux";

type NavbarProps = {
  cartCount: number;
  onLoginClick: () => void;
  onRegClick: () => void;
  onLogoutClick: () => void;
  onCartClick: () => void;
};

const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onLoginClick,
  onRegClick,
  onLogoutClick,
  onCartClick,
}) => {
  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => setDropdownOpen((open) => !open);

  return (
    <>
      <div className={`nav-bg${dropdownOpen ? " nav-bg--dropdown" : ""}`}></div>
      <nav className="navbar">
        <div className="navbar-left">
          {/* Desktop links */}
          <div className="navbar-links">
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/checkout">Checkout</Link>
          </div>
        </div>
        {/* Hamburger for mobile */}
        <div className="navbar-dropdown">
          <button
            className="navbar-dropdown-toggle"
            tabIndex={0}
            onClick={handleDropdownToggle}
            aria-label="Open navigation menu"
          >
            ☰
          </button>
          <div className={`navbar-dropdown-menu${dropdownOpen ? " open" : ""}`}>
            <Link to="/" onClick={() => setDropdownOpen(false)}>
              Home
            </Link>
            <Link to="/profile" onClick={() => setDropdownOpen(false)}>
              Profile
            </Link>
            <Link to="/checkout" onClick={() => setDropdownOpen(false)}>
              Checkout
            </Link>
          </div>
        </div>
        <div className="navbar-right">
          {!user && (
            <div className="log-reg-btns">
              <button className="log-btn" onClick={onLoginClick}>
                Login
              </button>
              <span>or</span>
              <button className="log-btn" onClick={onRegClick}>
                Register
              </button>
            </div>
          )}
          {user && (
            <div className="log-in-cont">
              <span onClick={() => navigate('/profile')}>{user.name || user.email}</span>
              <button className="log-btn" onClick={onLogoutClick}>
                Logout
              </button>
            </div>
          )}
          <div
            className="cart-icon-wrapper"
            onClick={onCartClick}
            title="View Cart"
          >
            <CartIcon className="cart-icon" />
            <span className="cart-badge">{cartCount}</span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
