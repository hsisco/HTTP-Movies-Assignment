import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'reactstrap';


const MovieCard = props => {
  const { title, director, metascore, stars } = props.movie;
  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Meta-score: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
      
      <NavLink to={`/update-movie/${id}`}>
        <Button>Edit</Button>
      </NavLink>
    </div>
  );
};

export default MovieCard;
