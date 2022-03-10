import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./Pages/Home";
import CreateStudent from "./Pages/CreateStudent";
import EditStudent from "./Pages/EditStudent";
import Alert from "./components/Alert/alert";

function App() {
  return (
    <div className="App">
      <Alert />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/create" component={CreateStudent} />
        <Route path="/edit/:id" component={EditStudent} />
      </Switch>
    </div>
  );
}

export default App;
