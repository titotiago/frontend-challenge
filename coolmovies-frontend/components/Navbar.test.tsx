import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useRouter } from "next/router";
import Navbar from "./Navbar";
import useThemeToggle from "../hooks/useThemeToggle";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../hooks/useThemeToggle", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("Navbar Component", () => {
  const mockPush = jest.fn();
  const toggleTheme = jest.fn();
  const mode = "light";

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    (useThemeToggle as jest.Mock).mockReturnValue({
      toggleTheme,
      mode,
    });
  });

  it("renders correctly", () => {
    render(<Navbar />);

    expect(screen.getByAltText("CoolMovies Logo")).toBeInTheDocument();
    expect(screen.getByText("CoolMovies")).toBeInTheDocument();
  });

  it("navigates to home page on logo click", () => {
    render(<Navbar />);

    const logo = screen.getByAltText("CoolMovies Logo").closest("div");
    fireEvent.click(logo as Element);

    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("toggles theme on button click", () => {
    render(<Navbar />);

    const themeToggleButton = screen.getByRole("button");
    fireEvent.click(themeToggleButton);

    expect(toggleTheme).toHaveBeenCalled();
  });
});
