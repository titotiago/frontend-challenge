import React, { useState } from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import { Rating } from "@mui/material";
import AddReviewForm from "./AddReviewForm";
import EditLogo from "../public/edit.svg";
import Image from "next/image";
interface MovieReviewProps {
  id: string;
  title: string;
  body: string;
  rating: number;
  reviewerName: string;
  isUserReview: boolean;
  movieId: string;
}

const Review: React.FC<MovieReviewProps> = ({
  id,
  title,
  body,
  rating,
  reviewerName,
  isUserReview,
  movieId,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <Paper className="p-4 mb-4 bg-white dark:bg-gray-800 text-black dark:text-white rounded rounded-xl">
      {isEditing ? (
        <Box>
          <AddReviewForm
            id={id}
            movieId={movieId}
            title={title}
            body={body}
            rating={rating}
            isEditing={true}
            onCancel={handleCancelEdit}
          />
        </Box>
      ) : (
        <>
          <Box className="flex justify-between">
            <Typography variant="h6" gutterBottom className="mb-5">
              {title}
            </Typography>
            {isUserReview && (
              <Button
                onClick={handleEditClick}
                className="h-fit w-fit rounded-full"
              >
                <Image src={EditLogo} alt="edit logo" width={25} height={25} />
              </Button>
            )}
          </Box>
          <Typography variant="body2" paragraph>
            {body}
          </Typography>
          <Rating value={rating} readOnly />
          <Typography
            variant="body2"
            color="textSecondary"
            className="text-black dark:text-white"
          >
            Reviewed by: {reviewerName}
          </Typography>
        </>
      )}
    </Paper>
  );
};

export default Review;
