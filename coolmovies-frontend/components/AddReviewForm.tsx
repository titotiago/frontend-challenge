import React from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Rating,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { appActions, useAppDispatch } from "../redux";
import { useAppSelector } from "../redux";
import { toast } from "react-toastify";
import { textFieldCss } from "../constants";

export interface AddReviewFormProps {
  id?: string;
  movieId: string;
  isEditing?: boolean;
  title?: string;
  body?: string;
  rating?: number;
  onCancel?: () => void;
}

const AddReviewForm: React.FC<AddReviewFormProps> = ({
  id = "",
  movieId,
  isEditing,
  title,
  body,
  rating = 0,
  onCancel = () => {},
}) => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.appState);

  const [reviewTitle, setReviewTitle] = useState(title);
  const [reviewBody, setReviewBody] = useState(body);
  const [reviewRating, setReviewRating] = useState<number | null>(rating);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!reviewTitle || !reviewBody || reviewRating === null || !currentUser) {
      toast.error("Cannot submit review with empty fields");
      return;
    }

    setSubmitting(true);
    if (isEditing) {
      try {
        await dispatch(
          appActions.updateMovieReview({
            id: id,
            movieReviewPatch: {
              title: reviewTitle,
              body: reviewBody,
              rating: reviewRating,
            },
          })
        );
        setReviewTitle("");
        setReviewBody("");
        setReviewRating(0);
      } catch (error) {
        toast.error("Failed to edit review");
      } finally {
        onCancel();
        setSubmitting(false);
      }
    } else {
      try {
        await dispatch(
          appActions.createMovieReview({
            title: reviewTitle,
            movieId,
            userReviewerId: currentUser.id,
            body: reviewBody,
            rating: reviewRating,
          })
        );
        setReviewTitle("");
        setReviewBody("");
        setReviewRating(0);
      } catch (error) {
        toast.error("Failed to submit review");
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <Box className="mt-8">
      <Typography variant="h6" gutterBottom>
        {isEditing ? "Edit Review" : "Add Review"}
      </Typography>
      <Paper className="p-4 bg-white dark:bg-gray-800 text-black">
        <TextField
          label="Title"
          value={reviewTitle}
          onChange={(e) => setReviewTitle(e.target.value)}
          fullWidth
          margin="normal"
          InputProps={{
            className: "text-black dark:text-white",
          }}
          sx={textFieldCss}
        />

        <TextField
          label="Write your review"
          value={reviewBody}
          onChange={(e) => setReviewBody(e.target.value)}
          fullWidth
          multiline
          rows={4}
          margin="normal"
          InputProps={{
            className: "text-black dark:text-white",
          }}
          sx={textFieldCss}
        />

        <Box className="my-4">
          <Rating
            value={reviewRating}
            onChange={(_, newValue) => setReviewRating(newValue)}
            precision={1}
          />
        </Box>
        <Box className="flex">
          <Button
            variant="contained"
            className="bg-secondary text-white mr-2 hover:bg-gray-800"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting
              ? "Submitting..."
              : `${isEditing ? "Edit" : "Submit"} Review`}
          </Button>
          {isEditing && (
            <Button
              variant="contained"
              className="bg-secondary text-white hover:bg-gray-800"
              onClick={onCancel}
              disabled={submitting}
            >
              {"Cancel"}
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default AddReviewForm;
