import { Navbar } from "./components/navbar";
import { Days } from "./components/days";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { SlateEditor } from "./editor";
import { Editor } from "slate";

export const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Days} />
          <Route path="/editor" exact component={SlateEditor} />
        </Switch>
      </Router>
    </div>
  );
};
