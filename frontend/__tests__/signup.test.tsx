import { fireEvent, render } from "@testing-library/react";
import SignUp from "../pages/signup";
import "@testing-library/jest-dom";

describe("Signup", () => {
  it("renders a signup page with an image, username field, password field, and signup button", () => {
    const { getByTestId } = render(<SignUp />);
    expect(getByTestId("logo")).toBeInTheDocument();
    expect(getByTestId("username")).toBeInTheDocument();
    expect(getByTestId("password")).toBeInTheDocument();
    expect(getByTestId("signup-button")).toBeInTheDocument();
  });

  it("displays the error message when username and password are empty", () => {
    const { getByTestId } = render(<SignUp />);

    // Simulate a click on the signup button with empty username and password fields
    const signupButton = getByTestId("signup-button");
    fireEvent.click(signupButton);

    // Check that the error message is displayed
    const errorMessage = getByTestId("error-message");
    expect(errorMessage).toBeInTheDocument();
  });

  it("displays the error message when only password is empty", () => {
    const { getByTestId } = render(<SignUp />);

    const usernameInput = getByTestId("username");
    fireEvent.change(usernameInput, { target: { value: "username test" } });

    const signupButton = getByTestId("signup-button");
    fireEvent.click(signupButton);

    const errorMessage = getByTestId("error-message");
    expect(errorMessage).toBeInTheDocument();
  });

  it("displays the error message when only username is empty", () => {
    const { getByTestId } = render(<SignUp />);

    const passwordInput = getByTestId("password");
    fireEvent.change(passwordInput, { target: { value: "password test" } });

    const signupButton = getByTestId("signup-button");
    fireEvent.click(signupButton);

    const errorMessage = getByTestId("error-message");
    expect(errorMessage).toBeInTheDocument();
  });

  it("routes to the dashboard when signup is successful", () => {
    const { getByTestId } = render(<SignUp />);

    const usernameInput = getByTestId("username");
    fireEvent.change(usernameInput, { target: { value: "username test" } });
    const passwordInput = getByTestId("password");
    fireEvent.change(passwordInput, { target: { value: "password test" } });

    const signupButton = getByTestId("signup-button");
    fireEvent.click(signupButton);

    // Check if local storage was set after signup
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
    };
    global.localStorage = localStorageMock as unknown as Storage;

    expect(localStorageMock.setItem).toHaveBeenCalled();
  });
});
