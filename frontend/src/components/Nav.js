import React from "react";
import { Link } from "react-router-dom";

class Nav extends React.Component {
  render() {
    return (
      <nav className="Nav">
        <div className="container">
          <ul>
            <li className="Nav-item">
              <Link to="/" className="Nav-link">
                Athletes
              </Link>
            </li>
            <li className="Nav-item">
              <Link to="/upload" className="Nav-link">
                Upload Athlete
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;
