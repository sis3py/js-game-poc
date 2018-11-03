import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const TitlePage = () => (
  <AppBar position="static">
    <Tabs value="">
      <Tab label="Create game" component={Link} to="/create" />
      <Tab label="Join game" component={Link} to="/join" />
      <Tab label="Options" component={Link} to="/options" />
    </Tabs>
  </AppBar>
);

export default TitlePage;
