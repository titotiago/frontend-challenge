import React from "react";
import { Card, CardMedia } from "@mui/material";
import { useRouter } from "next/router";
import { getYearFromDate } from "../utils/dateFormat";

interface MovieProps {
  id: string;
  imgUrl: string;
  title: string;
  releaseDate: string;
}

const Movie: React.FC<MovieProps> = ({ id, imgUrl, title, releaseDate }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/reviews/${id}`);
  };

  return (
    <Card
      onClick={handleClick}
      className="relative max-w-xs h-[450px] mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg cursor-pointer transition-transform transform hover:scale-105 overflow-hidden"
    >
      <CardMedia
        component="img"
        height="300"
        image={imgUrl}
        alt={`${title} poster`}
        className="h-full object-cover fill"
      />
      <div className="absolute inset-0 flex items-end justify-center p-3 transition-opacity opacity-0 bg-gradient-to-t from-black via-transparent to-transparent hover:opacity-100 dark:from-gray-900 dark:via-transparent">
        <div className="text-center text-white select-none">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p>{`Released in: ${getYearFromDate(releaseDate)}`}</p>
        </div>
      </div>
    </Card>
  );
};

export default Movie;
