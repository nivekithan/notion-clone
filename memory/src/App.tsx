import React from "react";
import "./tailwind/base.css";
import { Button } from "./component/button/button";

function App() {
  return (
    <div className="App">
      <Button label="inside app" />
    </div>
  );
}

export default App;
