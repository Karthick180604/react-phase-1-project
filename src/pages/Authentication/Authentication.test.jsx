import { render, screen, fireEvent } from "@testing-library/react";
import Authentication from "./Authentication";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

vi.mock("../../components/Login/Login", () => ({
  default: ({ onLogin, loginOrSignupRequest }) => (
    <div>
      <p>Login Component</p>
      <button onClick={() => onLogin({ useremail: "test", userpassword: "1234", userid: "1" })}>
        Mock Login
      </button>
      <button onClick={loginOrSignupRequest}>Switch to Signup</button>
    </div>
  ),
}));

vi.mock("../../components/Signup/Signup", () => ({
  default: ({ onSignup, loginOrSignupRequest }) => (
    <div>
      <p>Signup Component</p>
      <button onClick={() => onSignup({ useremail: "test", userpassword: "1234", userid: "1" })}>
        Mock Signup
      </button>
      <button onClick={loginOrSignupRequest}>Switch to Login</button>
    </div>
  ),
}));

vi.mock("../../components/Welcome/Welcome", () => ({
  default: ({ children }) => <div>{children}</div>,
}));

describe("Authentication Component", () => {
  test("initially renders Signup", () => {
    render(<Authentication />, { wrapper: MemoryRouter });
    const findLogin=screen.queryByText("Login Component");
    expect(findLogin).toBeNull()
    expect(screen.getByText("Signup Component")).toBeInTheDocument();
  });

  test("switches to Login when button is clicked", () => {
    render(<Authentication />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByText("Switch to Login"));
    expect(screen.getByText("Login Component")).toBeInTheDocument();
  });

  test("signs up and logs in user", () => {
    render(<Authentication />, { wrapper: MemoryRouter });

    fireEvent.click(screen.getByText("Mock Signup"));
    fireEvent.click(screen.getByText("Switch to Login"));

    fireEvent.click(screen.getByText("Mock Login"));

    expect(screen.queryByText("User does not exist")).not.toBeInTheDocument();
  });

  test("shows error snackbar for invalid login", () => {
    render(<Authentication />, { wrapper: MemoryRouter });

    fireEvent.click(screen.getByText("Switch to Login"));

    fireEvent.click(screen.getByText("Mock Login"));

    expect(screen.getByText("User does not exist")).toBeInTheDocument();
  });
});
