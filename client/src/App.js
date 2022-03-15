import "./App.css";
import Alert from "./components/Alert/alert";
import Layout from "./layout/index";

function App() {
  return (
    <div className="App">
      <Alert />
      {/* <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/create" component={CreateStudent} />
        <Route path="/edit/:id" component={EditStudent} />
      </Switch> */}
      <Layout />
    </div>
  );
}

export default App;
