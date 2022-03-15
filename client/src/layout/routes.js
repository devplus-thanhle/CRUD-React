import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "../components/NotFound";
import CreateStudent from "../Pages/CreateStudent";
import EditStudent from "../Pages/EditStudent";
import Home from "../Pages/Home";

function Router(props) {
  return (
    <>
      <Switch>
        <Route path="/list" exact component={Home} />
        <Route path="/create" component={CreateStudent} />
        <Route path="/edit/:id" component={EditStudent} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default Router;
