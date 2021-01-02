import React from "react";
import "./tailwind/base.css";
import 'katex/dist/katex.min.css';

import { Button } from "./components/button/button";

function App() {
  return (
    <div className="App">
      <Button label="inside app" />
    </div>
  );
}

export default App;
