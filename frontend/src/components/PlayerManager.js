import React from "react";

import PlayersList from "./PlayersList";

class PlayerManager extends React.Component {
  render() {
    return (
      <div className="PlayerManager">
        <div className="container">
          <PlayersList />
        </div>
      </div>
    );
  }
}

export default PlayerManager;
