import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class PlayersList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      players: []
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost/player-manager/backend/api/players`)
      .then(res => {
        const players = res.data;
        this.setState(() => ({ players }));
      });
  }
  render() {
    return (
      <div className="PlayersList">
        <div className="PlayersList-title">
          <h2>List of Players Below</h2>
        </div>
        {this.state.players.map(player => {
          return (
            <div className="PlayersList-item" key={player.id}>
              <Link className="PlayersList-link" to={"/player/" + player.id}>
                {player.name}
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}

export default PlayersList;
