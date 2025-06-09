# Advanced React E-Commerce Web App

---

## Table of Contents

1. [Project Setup](#project-setup)
2. [App Usage](#app-usage)
3. [Features](#features)
4. [Project Structure](#project-structure)

    - [Components](#components)
    - [Pages](#pages)
    - [Types](#types)
    - [State Management](#state-management)
    - [Data Fetching](#data-fetching)

---

### Project Setup

Clone the repo and navigate to the project directory:

```sh
git clone https://github.com/alivsey87/ecommerce-app.git
cd ecommerce-app
```

Install all dependencies needed for this project (React, React DOM, React Router, Redux/Redux Toolkit, React Query, (Smastrom) React Rating, and Axios):

```sh
npm install
```

Run the app:

```sh
npm run dev
```

---

### App Usage

- The app displays a list of products fetched from the Fake Store API.
- Users can filter products by category using the navigation bar.
- Products can be added to the shopping cart.
- The cart modal allows users to view, update, or remove items, clear the cart, and proceed to checkout.
- Product ratings are displayed using a star rating component.

---

### Features

- **Product Listing:** Browse products with images, descriptions, prices, and ratings.
- **Category Filtering:** Filter products by category using a dropdown or select menu.
- **Shopping Cart:** Add, update, or remove products from the cart; view cart total.
- **Cart Modal:** View and manage cart contents in a modal overlay.
- **Checkout Flow:** Proceed to checkout from the cart modal.
- **Responsive Design:** Works well on desktop and mobile devices.
- **Efficient Data Fetching:** Uses Axios and React Query for fetching and caching data.
- **Global State Management:** Uses Redux Toolkit for cart and product state.

---

### Project Structure

#### Components

- **Navbar:** Handles category selection, filter clearing, and cart access.
- **ProductCard:** Displays individual product details and add-to-cart button.
- **CartModal:** Modal overlay for viewing and managing cart contents.

#### Pages

- **Home:** Main landing page displaying products and category filter.
- **Checkout:** Handles the checkout process.

#### Types

- **Product, CartItem, Category:** Defined in `src/types/types.ts` for type safety across the app.

#### State Management

- **Redux Toolkit:** Manages global state for products, categories, and cart items.
  - The Redux **store** is configured in `src/app/store.ts`.
  - State is organized into **slices**:
    - `productSlice` (`src/features/products/productSlice.ts`): Handles product data and selected category.
    - `cartSlice` (`src/features/cart/cartSlice.ts`): Manages cart items and cart actions (add, remove, update, clear).

#### Data Fetching

- **React Query & Axios:**  
  Handles data fetching and caching for products and categories, reducing the need for manual API state management.  
  - **Axios** is used within API utility functions (e.g., `src/api/api.ts`) to make HTTP requests to the Fake Store API.
  - **React Query** calls these Axios-based functions to fetch data, manage caching, and keep UI in sync with the backend efficiently.

---

[back to top](#advanced-react-e-commerce-web-app)