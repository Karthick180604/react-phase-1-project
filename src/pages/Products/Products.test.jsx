import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Products from "./Products";
import { vi } from "vitest";

vi.mock("../../services/apiCalls", () => ({
  getAllProducts: vi.fn(),
}));

import { getAllProducts } from "../../services/apiCalls";

const mockedProducts = [
  {
    id: 1,
    title: "iPhone",
    price: 999,
    description: "Apple phone",
    category: "electronics",
    image: "image.jpg",
    rating: { rate: 4.5, count: 120 },
  },
  {
    id: 2,
    title: "Jacket",
    price: 59.99,
    description: "Winter jacket",
    category: "clothing",
    image: "jacket.jpg",
    rating: { rate: 4.2, count: 75 },
  },
];

describe("Products Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state", async () => {
    getAllProducts.mockReturnValue(new Promise(() => {}));
    render(<Products />, { wrapper: MemoryRouter });

    expect(screen.getByTestId("circular-progress")).toBeInTheDocument();
  });

  it("renders error state", async () => {
    getAllProducts.mockRejectedValue(new Error("API Error"));

    render(<Products />, { wrapper: MemoryRouter });

    await waitFor(() => {
      expect(
        screen.getByText(/Something Went wrong/i)
      ).toBeInTheDocument();
    });
  });

  it("renders fetched products", async () => {
    getAllProducts.mockResolvedValue({ data: mockedProducts });

    render(<Products />, { wrapper: MemoryRouter });

    await waitFor(() => {
      expect(screen.getByText("iPhone")).toBeInTheDocument();
      expect(screen.getByText("Jacket")).toBeInTheDocument();
    });
  });
});
