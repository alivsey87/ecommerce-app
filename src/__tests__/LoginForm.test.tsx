import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginForm from "../components/Auth/LoginForm";


const renderLoginForm = () => {
  return render(<LoginForm onClose={() => {}} />);
};

describe("LoginForm", () => {
  it("renders form elements", () => {
    renderLoginForm();

    expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = renderLoginForm();
    expect(container.firstChild).toMatchSnapshot();
  });

  it("updates input values when typing", () => {
    renderLoginForm();

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
  });
});
