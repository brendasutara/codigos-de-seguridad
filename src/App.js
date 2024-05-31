import "./App.css";
import { ClassState } from "./ClassState";
import { UseState } from "./UseState";

function App() {
  return (
    <div className="App">
      <UseState name="UseState" />
      <ClassState name="ClassState" />
    </div>
  );
}

export default App;
