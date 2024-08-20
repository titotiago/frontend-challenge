import { render, screen, fireEvent } from "@testing-library/react";
import Review from "./Review";
import AddReviewForm from "./AddReviewForm";
jest.mock("../public/edit.svg", () => "/mocked-image-url");

jest.mock("./AddReviewForm", () => ({
  __esModule: true,
  default: jest.fn(() => <div>AddReviewForm Component</div>),
}));

describe("Review Component", () => {
  const mockProps = {
    id: "1",
    title: "Great Movie",
    body: "I really enjoyed this movie. It was fantastic!",
    rating: 4,
    reviewerName: "John Doe",
    isUserReview: true,
    movieId: "101",
  };

  it("renders the review correctly", () => {
    render(<Review {...mockProps} />);

    expect(screen.getByText("Great Movie")).toBeInTheDocument();
    expect(
      screen.getByText("I really enjoyed this movie. It was fantastic!")
    ).toBeInTheDocument();
    expect(screen.getByText("Reviewed by: John Doe")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /edit logo/i })).toBeInTheDocument();
  });

  it("shows AddReviewForm when edit button is clicked", () => {
    render(<Review {...mockProps} />);

    fireEvent.click(screen.getByRole("button", { name: /edit logo/i }));

    expect(screen.getByText("AddReviewForm Component")).toBeInTheDocument();
  });

  it("hides AddReviewForm when cancel is clicked", () => {
    const { rerender } = render(<Review {...mockProps} />);

    fireEvent.click(screen.getByRole("button", { name: /edit logo/i }));

    expect(screen.getByText("AddReviewForm Component")).toBeInTheDocument();
    (AddReviewForm as jest.Mock).mockImplementation(({ onCancel }) => (
      <div>
        AddReviewForm Component
        <button onClick={onCancel}>Cancel</button>
      </div>
    ));

    rerender(<Review {...mockProps} />);

    fireEvent.click(screen.getByText("Cancel"));

    expect(
      screen.queryByText("AddReviewForm Component")
    ).not.toBeInTheDocument();
  });
});
