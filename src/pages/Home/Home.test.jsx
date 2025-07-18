import { render, screen } from "@testing-library/react";
import Home from "./Home";
import "@testing-library/jest-dom";

test("renders welcome message", () => {
  render(<Home />);
  
  const paragraphs = screen.getAllByText((_, element) =>
    element?.textContent?.includes(
      "Welcome to Shopora! where style meets tech, elegance meets performance."
    )
  );
  const secondLine = screen.getByText(/Discover the best in fashion, gadgets, jewelry/i);
  
  expect(paragraphs[0]).toBeInTheDocument();
  expect(secondLine).toBeInTheDocument();
});

test("renders welcome image", () => {
  render(<Home />);
  
  const img = screen.getByRole("img");
  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute("src", expect.stringContaining("shutter-speed"));
});

test("home snapshot",()=>{
  const home=render(<Home />)
  expect(home).toMatchSnapshot();
})
