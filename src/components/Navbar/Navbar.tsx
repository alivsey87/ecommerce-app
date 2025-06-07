import React from "react";
import type { Category } from "../../types/types";

interface NavbarProps {
  categories: Category[] | undefined;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onClearFilter: () => void;
  cartCount: number;
  onCartClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  onClearFilter,
  cartCount,
  onCartClick,
}) => (
  <nav className="navbar">
    <div className="navbar-left">
      <label htmlFor="category-select" className="navbar-label">
        Filter by category
      </label>
      <select
        id="category-select"
        className="navbar-select"
        onChange={(e) => onCategoryChange(e.target.value)}
        value={selectedCategory}
      >
        <option value="">All Categories</option>
        {categories?.map((category) => (
          <option value={category} key={category}>
            {category}
          </option>
        ))}
      </select>
      <button className="btn-main navbar-btn" onClick={onClearFilter}>
        Clear Filter
      </button>
    </div>
    <div className="navbar-dropdown">
      <button className="navbar-dropdown-toggle" tabIndex={0}>
        ☰
      </button>
      <div className="navbar-dropdown-menu">
        <select
          id="category-select-mobile"
          className="navbar-select"
          aria-label="Filter by category (mobile)"
          onChange={(e) => onCategoryChange(e.target.value)}
          value={selectedCategory}
        >
          <option value="">All Categories</option>
          {categories?.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
        <button className="btn-main navbar-btn" onClick={onClearFilter}>
          Clear Filter
        </button>
      </div>
    </div>
    <div className="navbar-right">
      <div
        className="cart-icon-wrapper"
        onClick={onCartClick}
        title="View Cart"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path
            d="M7 18c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm10 0c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm-12.293-2.707l1.414 1.414c.195.195.451.293.707.293h12c.552 0 1-.448 1-1s-.448-1-1-1h-11.586l-.707-.707c-.391-.391-1.023-.391-1.414 0s-.391 1.023 0 1.414zm15.293-2.293c0-.552-.448-1-1-1h-13.586l-.707-.707c-.391-.391-1.023-.391-1.414 0s-.391 1.023 0 1.414l2 2c.195.195.451.293.707.293h12c.552 0 1-.448 1-1zm-1-6c0-.552-.448-1-1-1h-10c-.552 0-1 .448-1 1s.448 1 1 1h10c.552 0 1-.448 1-1z"
            fill="#333"
          />
        </svg>
        <span className="cart-badge">{cartCount}</span>
      </div>
    </div>
  </nav>
);

export default Navbar;