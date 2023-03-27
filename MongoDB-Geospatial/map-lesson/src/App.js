import logo from "./logo.svg";
import "./App.css";
import Map from "./components/Map";
import MapMarkers from "./components/MapMarkers";
import Restaurants from "../src/components/Restaurants";
import Control from "../src/components/Control";
import Example from "./components/Example";

function App() {
  return (
    <div>
      {/* <Map /> */}
      {/* <MapMarkers /> */}
      <Control />
      <Example />
    </div>
  );
}

export default App;
