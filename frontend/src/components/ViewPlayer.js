import React from "react";
import axios from "axios";
import Player from "./Player";

class ViewPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      player: []
    };
  }

  componentDidMount() {
    // Get details about Player by making an API call with specific ID
    axios
      .get(
        `http://localhost/player-manager/backend/api/players/${
          this.props.match.params.id
        }`
      )
      .then(res => {
        const player = res.data;
        this.setState(() => ({ player }));
      });
  }

  render() {
    return (
      <div className="container">
        <h1>View Player</h1>
        {this.state.player.map(player => {
          return <Player key={player.id} {...player} />;
        })}
      </div>
    );
  }
}

export default ViewPlayer;
