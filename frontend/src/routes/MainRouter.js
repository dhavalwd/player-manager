import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PlayerManager from "../components/PlayerManager";
import Header from "../components/Header";
import ViewPlayer from "../components/ViewPlayer";
import UploadPlayer from "../components/UploadPlayer";

const MainRouter = props => {
  return (
    <BrowserRouter>
      <div>
        <Header>Player Manager</Header>
        <Switch>
          <Route path="/" component={PlayerManager} exact={true} />
          <Route path="/player/:id/" component={ViewPlayer} />
          <Route path="/upload" component={UploadPlayer} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default MainRouter;
