import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useRouter } from "next/router";
import Movie from "./Movie";
import { getYearFromDate } from "../utils/dateFormat";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../utils/dateFormat", () => ({
  getYearFromDate: jest.fn(),
}));

describe("Movie Component", () => {
  const id = "1";
  const imgUrl = "https://example.com/poster.jpg";
  const title = "Example Movie";
  const releaseDate = "2022-01-01";

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
    (getYearFromDate as jest.Mock).mockReturnValue("2022");
  });

  it("renders correctly", () => {
    render(
      <Movie id={id} imgUrl={imgUrl} title={title} releaseDate={releaseDate} />
    );

    expect(screen.getByAltText(`${title} poster`)).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText("Released in: 2022")).toBeInTheDocument();
  });

  it("navigates to the correct URL on click", () => {
    const { push } = useRouter();
    render(
      <Movie id={id} imgUrl={imgUrl} title={title} releaseDate={releaseDate} />
    );

    const card = screen.getByRole("img");
    fireEvent.click(card);

    expect(push).toHaveBeenCalledWith(`/reviews/${id}`);
  });
});
