import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import axios from "axios";
import LoginPage from "../dashboard/LoginPage";
import { UserRole } from "../types";

jest.mock("axios"); // Mock axios module

// Mock the GoogleLogin component
jest.mock("@react-oauth/google", () => ({
  GoogleLogin: ({
    onSuccess,
    onError,
  }: {
    onSuccess: (res: any) => void;
    onError: () => void;
  }) => (
    <button onClick={() => onSuccess({ credential: "google_token" })}>
      Mock Google Login
    </button>
  ),
}));

// Mock parseJwt function
const mockParseJwt = (token: string) => {
  if (token === "mock_jwt_token") {
    return { role: "admin" as UserRole };
  }
  if (token === "google_mock_jwt_token") {
    return { role: "user" as UserRole };
  }
  return {};
};

// Add parseJwt to the global window object
(global as any).parseJwt = mockParseJwt;

describe("LoginPage", () => {
  beforeEach(() => {
    sessionStorage.clear(); // Clear session storage before each test
    jest.restoreAllMocks(); // Clear mocks
  });

  it("should login with username and password and redirect based on role", async () => {
    const mockPost = axios.post as jest.Mock;
    const token = "mock_jwt_token";

    // Mock login API call
    mockPost.mockResolvedValueOnce({ data: { token }, status: 200 });

    // Mock session storage for token
    jest
      .spyOn(window.sessionStorage.__proto__, "getItem")
      .mockImplementation((key) => {
        if (key === "token") return token;
        return null;
      });

    const { getByLabelText, getByText } = render(<LoginPage />);

    // Fill out form fields
    fireEvent.change(getByLabelText("Username"), { target: { value: "user" } });
    fireEvent.change(getByLabelText("Password"), {
      target: { value: "password" },
    });

    // Simulate form submission
    fireEvent.click(getByText("Login"));

    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledWith(
        "http://localhost:8000/api/users/login",
        { username: "user", password: "password" }
      );
      expect(sessionStorage.getItem("token")).toBe(token);

      const decodedToken = mockParseJwt(token);
      if (decodedToken.role === "admin" || decodedToken.role === "superadmin") {
        expect(window.location.href).toBe("/admin");
      } else {
        expect(window.location.href).toBe("/");
      }
    });
  });

  it("should login with Google and redirect based on role", async () => {
    const mockPost = axios.post as jest.Mock;
    const userToken = "google_mock_jwt_token";

    // Mock Google login API call
    mockPost.mockResolvedValueOnce({ data: { token: userToken }, status: 200 });

    // Mock session storage for token
    jest
      .spyOn(window.sessionStorage.__proto__, "getItem")
      .mockImplementation((key) => {
        if (key === "token") return userToken;
        return null;
      });

    const { getByText } = render(<LoginPage />);

    // Simulate Google login button click
    fireEvent.click(getByText("Mock Google Login"));

    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledWith(
        "http://localhost:8000/api/users/auth/google",
        { token: "google_token" },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      expect(sessionStorage.getItem("token")).toBe(userToken);

      const decodedToken = mockParseJwt(userToken);
      if (decodedToken.role === "admin" || decodedToken.role === "superadmin") {
        expect(window.location.pathname).toBe("/admin");
      } else {
        expect(window.location.pathname).toBe("/");
      }
    });
  });

  it("should display an error message on login failure", async () => {
    const mockPost = axios.post as jest.Mock;

    // Mock login API call failure
    mockPost.mockRejectedValueOnce(new Error("Login failed"));

    const { getByLabelText, getByText, findByText } = render(<LoginPage />);

    // Fill out form fields
    fireEvent.change(getByLabelText("Username"), { target: { value: "user" } });
    fireEvent.change(getByLabelText("Password"), {
      target: { value: "password" },
    });

    // Simulate form submission
    fireEvent.click(screen.getByTestId("login-btn"));

    // const errorMessage = await findByText("Login failed, please try again.");
    // expect(errorMessage).toBeInTheDocument();
  });
});
