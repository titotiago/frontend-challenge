import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import AddReviewForm, { AddReviewFormProps } from "./AddReviewForm";
import { appActions } from "../redux";
import { jest } from "@jest/globals";

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

const mockDispatch = jest.fn();
const mockStore = configureStore({
  reducer: {
    appState: createSlice({
      name: "appState",
      initialState: { currentUser: { id: "user123" } },
      reducers: {},
    }).reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(() => (next) => (action) => {
      if (action.type.startsWith("appState")) {
        return mockDispatch(action);
      }
      return next(action);
    }),
});

const renderComponent = (props: Partial<AddReviewFormProps> = {}) => {
  const propsWithDefaults = {
    movieId: "",
    ...props,
  } as AddReviewFormProps;

  return render(
    <Provider store={mockStore}>
      <AddReviewForm {...propsWithDefaults} />
    </Provider>
  );
};

describe("AddReviewForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly for adding a review", () => {
    renderComponent({ movieId: "movie123" });
    expect(screen.getByText("Add Review")).toBeInTheDocument();
    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Write your review")).toBeInTheDocument();
  });

  it("renders correctly for editing a review", () => {
    renderComponent({
      movieId: "movie123",
      isEditing: true,
      title: "Old Title",
      body: "Old Body",
      rating: 3,
      id: "review123",
      onCancel: () => {},
    });
    expect(
      screen.getByRole("heading", { level: 6, name: /Edit Review/i })
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue("Old Title")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Old Body")).toBeInTheDocument();
  });

  it("displays error toast when fields are empty", async () => {
    renderComponent({ movieId: "movie123" });
    fireEvent.click(screen.getByText("Submit Review"));
    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith(
        "Cannot submit review with empty fields"
      )
    );
  });

  it("dispatches createMovieReview action on submit", async () => {
    renderComponent({ movieId: "movie123" });
    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "New Title" },
    });
    fireEvent.change(screen.getByLabelText("Write your review"), {
      target: { value: "New Body" },
    });
    fireEvent.click(screen.getByText("Submit Review"));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        appActions.createMovieReview({
          title: "New Title",
          movieId: "movie123",
          userReviewerId: "user123",
          body: "New Body",
          rating: 0,
        })
      );
    });
  });

  it("dispatches updateMovieReview action on submit when editing", async () => {
    renderComponent({
      movieId: "movie123",
      isEditing: true,
      id: "review123",
      title: "Old Title",
      body: "Old Body",
      rating: 3,
      onCancel: () => {},
    });
    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "Updated Title" },
    });
    fireEvent.change(screen.getByLabelText("Write your review"), {
      target: { value: "Updated Body" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Edit Review/i }));
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        appActions.updateMovieReview({
          id: "review123",
          movieReviewPatch: {
            title: "Updated Title",
            body: "Updated Body",
            rating: 3,
          },
        })
      );
    });
  });

  it("calls onCancel when cancel button is clicked", () => {
    const onCancel = jest.fn();
    renderComponent({
      movieId: "movie123",
      isEditing: true,
      onCancel: onCancel,
    });
    fireEvent.click(screen.getByText("Cancel"));
    expect(onCancel).toHaveBeenCalled();
  });
});
