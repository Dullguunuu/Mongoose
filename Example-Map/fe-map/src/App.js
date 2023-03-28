import { useState, useEffect } from "react";
import {
  MapContainer, TileLayer, useMap, Marker, Popup, Polygon,
} from "react-leaflet";
import './App.css';
import axios from "axios"

function App() {
  const position = [40.7660018, -73.9868879]
  const [curLocation, setCurLocation] = useState();
  const [data, setData] = useState();
  const [activeFuncName, setActiveFuncName] = useState("0");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function getCurrent() {
      if (navigator.geolocation) {
        await navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }
    getCurrent();
  }, []);

  function showPosition(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;

    setCurLocation({ lat: 40.7660018, long: -73.9868879 });
    setLoading(false);

    console.log("Latitude: " + lat);
    console.log("Longitude: " + long);
  }

  function getData(path) {
    if (path !== "0") {
      console.log(path)
      axios.post(`http://localhost:9000/api/${path}`, curLocation)
        .then((res) => {
          console.log(res.data);
          setData(res.data.result);
        })
        .catch((err) => console.log(err));
    } else {
      setData();
    }
  };

  if (loading) return <h1> Loading </h1>;

  function callData(param) {
    let path = '';
    if (param === "1") {
      path = "currentNeighborHood"
    }
    else if (param === "2") {
      path = "findAllResInNeighborhood"
    }
    else if (param === "3") {
      path = "restaurants"
    }
    else {
      path = "0"
    }
    setActiveFuncName(param);
    getData(path);
  }

  const purpleOptions = { color: "purple" };

  function changePosition(arr) {
    arr.map((item) => {
      const elem = item.splice(0, 1)[0];
      item.splice(1, 0, elem);
    });
  };

  if (!curLocation) return null;

  return (
    <div className="d-flex">
      <MapContainer center={position} zoom={9} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            El Centro
          </Popup>
        </Marker>
        {data && (
          <>
            {data.geometry && activeFuncName === "1" ? (
              <>
                {changePosition(data.geometry.coordinates[0])}
                <Polygon
                  pathOptions={purpleOptions}
                  positions={[
                    data && data.geometry && data.geometry.coordinates[0],
                  ]}
                />
              </>
            ) : activeFuncName === "2" ? (
              <>
                {data.length > 0 &&
                  data?.map((item, index) => {
                    return (
                      <Marker
                        position={[
                          item.location.coordinates[1],
                          item.location.coordinates[0],
                        ]}
                        eventHandlers={{
                          click: () => {
                            console.log("marker clicked");
                          },
                        }}
                      >
                        <Popup>{item.name}</Popup>
                      </Marker>
                    );
                  })}
              </>
            ) : activeFuncName === "3" ? (
              <>
                {data.length > 0 &&
                  data?.map((item, index) => {
                    return (
                      <Marker
                        position={[
                          item.location.coordinates[1],
                          item.location.coordinates[0],
                        ]}
                        eventHandlers={{
                          click: () => {
                            console.log("marker clicked");
                          },
                        }}
                      >
                        <Popup>{item.name}</Popup>
                      </Marker>
                    );
                  })}
              </>
            ) : (
              <>
                {data.length > 0 &&
                  data?.map((item, index) => {
                    return (
                      <Marker
                        position={[
                          item.location.coordinates[1],
                          item.location.coordinates[0],
                        ]}
                        eventHandlers={{
                          click: () => {
                            console.log("marker clicked");
                          },
                        }}
                      >
                        <Popup>{item.name}</Popup>
                      </Marker>
                    );
                  })}
              </>
            )}
          </>
        )}
      </MapContainer>
      <div className="" style={{ padding: "10px" }}>
        <button className="btn btn-outline-primary" onClick={() => callData("0")}>Reset</button>
        <button className="btn btn-outline-primary" onClick={() => callData("1")}>Find the Current Neighborhood</button>
        <button className="btn btn-outline-primary" onClick={() => callData("2")}>Find all Restaurants in the Neighborhood</button>
        <button className="btn btn-outline-primary" onClick={() => callData("3")}>Find 300 restaurants</button>
      </div>
    </div >
  );
}

export default App;
