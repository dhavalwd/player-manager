import React from "react";
import axios from "axios";
import $ from "jquery";

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.deletePlayer = this.deletePlayer.bind(this);
  }

  deletePlayer() {
    // Make a call to delete players
    axios
      .delete(
        `http://localhost/player-manager/backend/api/players/${this.props.id}`,
        {
          params: {}
        }
      )
      .then(res => {
        console.log(res);
        // Update feedback status on the page with the text.
        $(".Player-feedback span")
          .addClass("is-success")
          .removeClass("is-error")
          .text("Successfully deleted player");
        setTimeout(() => {
          window.location.href = "/";
        }, 400);
      })
      .catch(error => {
        console.log(error);
        // Show error if something goes wrong during call
        $(".Player-feedback span")
          .addClass("is-error")
          .removeClass("is-success")
          .text("Something went wrong, please try again later");
      });
  }

  render() {
    return (
      <div className="Player">
        <div className="Player-feedback">
          <span />
        </div>
        <div className="Player-content">
          <div className="Player-name">
            <h2>{this.props.name}</h2>
          </div>
          <div className="Player-details">
            <p>Age: {this.props.age}</p>
            <p>City: {this.props.city}</p>
            <p>Province: {this.props.province}</p>
            <p>Country: {this.props.country}</p>
            <p>
              <a
                href="javascript: void(0)"
                className="btn btn-danger"
                onClick={this.deletePlayer}
              >
                Delete
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Player;
