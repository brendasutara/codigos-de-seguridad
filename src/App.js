import "./App.css";
import { UseReducer } from "./UseReducer";
import { UseState } from "./UseState";

function App() {
  return (
    <div className="App">
      <UseState name="UseState" />
      <UseReducer name="UseReducer" />
    </div>
  );
}

export default App;
