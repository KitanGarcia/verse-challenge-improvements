import { fireEvent, render } from "@testing-library/react";
import Login from "../pages/login";
import "@testing-library/jest-dom";

describe("Login", () => {
  it("renders a login page with an image, username field, password field, remember me box, and login button", () => {
    const { getByTestId } = render(<Login />);
    expect(getByTestId("logo")).toBeInTheDocument();
    expect(getByTestId("username")).toBeInTheDocument();
    expect(getByTestId("password")).toBeInTheDocument();
    expect(getByTestId("remember-me")).toBeInTheDocument();
    expect(getByTestId("login-button")).toBeInTheDocument();
  });

  it("displays the error message when username and password are empty", () => {
    const { getByTestId } = render(<Login />);

    // Simulate a click on the login button with empty username and password fields
    const loginButton = getByTestId("login-button");
    fireEvent.click(loginButton);

    // Check that the error message is displayed
    const errorMessage = getByTestId("error-message");
    expect(errorMessage).toBeInTheDocument();
  });

  it("displays the error message when only password is empty", () => {
    const { getByTestId } = render(<Login />);

    const usernameInput = getByTestId("username");
    fireEvent.change(usernameInput, { target: { value: "username test" } });

    const loginButton = getByTestId("login-button");
    fireEvent.click(loginButton);

    const errorMessage = getByTestId("error-message");
    expect(errorMessage).toBeInTheDocument();
  });

  it("displays the error message when only username is empty", () => {
    const { getByTestId } = render(<Login />);

    const passwordInput = getByTestId("password");
    fireEvent.change(passwordInput, { target: { value: "password test" } });

    const loginButton = getByTestId("login-button");
    fireEvent.click(loginButton);

    const errorMessage = getByTestId("error-message");
    expect(errorMessage).toBeInTheDocument();
  });

  it("routes to the dashboard when login is successful", () => {
    const { getByTestId } = render(<Login />);

    const usernameInput = getByTestId("username");
    fireEvent.change(usernameInput, { target: { value: "username test" } });
    const passwordInput = getByTestId("password");
    fireEvent.change(passwordInput, { target: { value: "password test" } });

    const loginButton = getByTestId("login-button");
    fireEvent.click(loginButton);

    // Check if local storage was set after login
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
    };
    global.localStorage = localStorageMock as unknown as Storage;

    expect(localStorageMock.setItem).toHaveBeenCalled();
  });
});
