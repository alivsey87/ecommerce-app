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
    - [Firebase Integration](#firebase-integration)

---

### Project Setup

Clone the repo and navigate to the project directory:

```sh
git clone https://github.com/alivsey87/ecommerce-app.git
cd ecommerce-app
```

Install all dependencies needed for this project (React, React DOM, React Router, Redux/Redux Toolkit, React Query, (Smastrom) React Rating, Axios, and Firebase):

```sh
npm install
```

Run the app:

```sh
npm run dev
```

---

### App Usage

- The app displays a list of products fetched from the Fake Store API and custom products stored in Firebase Firestore.
- Users can filter products by category using the navigation bar.
- Products can be added to the shopping cart.
- Users can register, login, and manage their accounts with Firebase Authentication.
- Authenticated users can create, edit, and delete custom products.
- The cart modal allows users to view, update, or remove items, clear the cart, and proceed to checkout.
- Users can complete purchases and view their order history.
- Account management features include profile editing and account deletion.
- Product ratings are displayed using a star rating component.

---

### Features

- **Product Listing:** Browse products with images, descriptions, prices, and ratings.
- **Category Filtering:** Filter products by category using a dropdown or select menu.
- **Shopping Cart:** Add, update, or remove products from the cart; view cart total.
- **Cart Modal:** View and manage cart contents in a modal overlay.
- **Checkout Flow:** Proceed to checkout from the cart modal.
- **User Authentication:** Register and login with Firebase Authentication.
- **Product Management:** Authenticated users can create, edit, and delete custom products.
- **Order Management:** Complete purchases and view order history.
- **Profile Management:** Edit profile information and delete account.
- **Responsive Design:** Works well on desktop and mobile devices.
- **Efficient Data Fetching:** Uses Axios and React Query for fetching and caching data.
- **Global State Management:** Uses Redux Toolkit for cart, product, and user state.
- **Firebase Integration:** Firestore for data storage and Firebase Auth for user management.

---

### Project Structure

#### Components

- **Navbar:** Handles navigation, authentication buttons, and cart access with responsive design.
- **ProductCard:** Displays individual product details, ratings, and add-to-cart functionality with edit/delete options for custom products.
- **CartModal:** Modal overlay for viewing and managing cart contents with quantity controls.
- **Modal:** Reusable modal component for various overlays.
- **ProductModal:** Form modal for creating and editing custom products.
- **LoginForm:** User authentication form for login.
- **RegistrationForm:** User registration form with Firebase Auth integration.
- **AuthListener:** Handles Firebase authentication state changes.
- **CartIcon:** SVG icon component for the cart.

#### Pages

- **Home:** Main landing page displaying products, category filter, and product management for authenticated users.
- **Checkout:** Handles the checkout process with cart review and purchase completion.
- **Profile:** User profile management including account editing and deletion.
- **Orders:** Order history display for authenticated users.

#### Types

- **Product, CartItem, Category, User, Order:** Defined in `src/types/types.ts` for comprehensive type safety across the app.

#### State Management

- **Redux Toolkit:** Manages global state for products, categories, cart items, and user authentication.
  - The Redux **store** is configured in `src/app/store.ts`.
  - State is organized into **slices**:
    - `productSlice` (`src/features/products/productSlice.ts`): Handles product data and selected category.
    - `cartSlice` (`src/features/cart/cartSlice.ts`): Manages cart items and cart actions (add, remove, update, clear).
    - `userSlice` (`src/features/user/userSlice.ts`): Manages user authentication state.

#### Firebase Integration

- **Firebase Authentication:** Handles user registration, login, logout, and account management.
  - Email/password authentication with account creation and login.
  - Real-time authentication state management.
  - Account deletion with data cleanup.
- **Cloud Firestore:** NoSQL database for storing user data, custom products, and order history.
  - User profiles stored with authentication data.
  - Custom product creation, editing, and deletion.
  - Order history tracking with user association.
  - Real-time data synchronization between API and Firestore products.

#### Data Fetching

- **React Query & Axios:**  
  Handles data fetching and caching for products and categories, reducing the need for manual API state management.  
  - **Axios** is used within API utility functions (e.g., `src/api/api.ts`) to make HTTP requests to the Fake Store API.
  - **React Query** calls these Axios-based functions to fetch data, manage caching, and keep UI in sync with the backend efficiently.

---

[back to top](#advanced-react-e-commerce-web-app)