// MovieCard.js
import React, { useState } from "react";
import { BsPlus } from "react-icons/bs";

const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="movie-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={movie.image} alt={movie.title} className="movie-image" />
      {isHovered && (
        <div className="movie-details">
          <span className="movie-duration">{movie.duration}</span>
          <span className="movie-genres">{movie.genres.join(", ")}</span>
          <div className="add-to-list">
            <BsPlus />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
