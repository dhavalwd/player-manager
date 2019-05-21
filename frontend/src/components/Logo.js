import React from "react";
import { Link } from "react-router-dom";

class Logo extends React.Component {
  render() {
    return (
      <div className="Logo Logo--centered">
        <div className="container">
          <h1>
            <Link to="/">Player Manager</Link>
          </h1>
        </div>
      </div>
    );
  }
}

export default Logo;
