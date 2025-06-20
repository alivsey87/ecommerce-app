import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Modal from "../components/Modal/Modal";

describe("Modal Component", () => {
  it("should render with correct visibility when isOpen is true", () => {
    
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <div>Test Content</div>
      </Modal>
    );

    const modalOverlay = screen
      .getByText("Test Content")
      .closest(".modal-overlay");

    expect(screen.getByText("Test Content")).toBeInTheDocument();
    expect(modalOverlay).toHaveClass("modal-overlay", "open");
    expect(modalOverlay).toHaveStyle("visibility: visible");
  });

  it("should render hidden when isOpen is false", () => {
    
    render(
      <Modal isOpen={false} onClose={() => {}}>
        <div>Test Content</div>
      </Modal>
    );

    const modalOverlay = screen
      .getByText("Test Content")
      .closest(".modal-overlay");

    expect(modalOverlay).not.toHaveClass("open");
    expect(modalOverlay).toHaveStyle("visibility: hidden");
    expect(modalOverlay).toHaveStyle("pointer-events: none");
  });

  it("should call onClose when close button is clicked", async () => {
    const mockOnClose = jest.fn();
    const user = userEvent.setup();

    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Test Content</div>
      </Modal>
    );

    const closeButton = screen.getByRole("button", { name: "×" });
    await user.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
