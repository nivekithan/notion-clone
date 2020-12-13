import { Navbar } from "./components/navbar";
import { Days } from "./components/days";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { SlateEditor } from "./editor";
import {TestComponent} from "./components/compTest/testComp";

export const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact render={() => <Days />} />
          <Route path="/editor" exact component={SlateEditor} />
          <Route path="/test/:id"  exact component={TestComponent} />
        </Switch>
      </Router>
    </div>
  );
};
