import React from "react";

const Player = ({ id, name, age, city, province, country }) => (
  <div className="Player">
    <div className="Player-content">
      <div className="Player-name">
        <h2>{name}</h2>
      </div>
      <div className="Player-details">
        <p>Age: {age}</p>
        <p>City: {city}</p>
        <p>Province: {province}</p>
        <p>Country: {country}</p>
      </div>
    </div>
  </div>
);

export default Player;
