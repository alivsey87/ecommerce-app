import { render, screen, fireEvent } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import cartReducer from "../features/cart/cartSlice";
import ProductCard from "../components/ProductCard/ProductCard";

jest.mock("@smastrom/react-rating");

test("cart is updated when product is added", () => {
  const store = configureStore({
    reducer: { cart: cartReducer },
  });

  const product = {
    id: "1",
    title: "Test Product",
    price: 10,
    description: "Test",
    category: "test",
    image: "test.jpg",
    rating: { rate: 5, count: 1 },
  };

  render(
    <Provider store={store}>
      <ProductCard
        product={product}
        setEditProduct={() => {}}
        handleDeleteProduct={() => {}}
      />
    </Provider>
  );

  expect(store.getState().cart.items).toHaveLength(0);

  fireEvent.click(screen.getByText("Add to Cart"));

  expect(store.getState().cart.items).toHaveLength(1);
  expect(store.getState().cart.items[0].productId).toBe("1");
});
