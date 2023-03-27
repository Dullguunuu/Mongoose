import React, { useEffect, useState } from "react";
import Restaurants from "./Restaurants";
import axios from "axios";

export default function Control() {
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

    // setCurLocation({ lat, long });
    setCurLocation({ lat: 40.82302903, long: -73.93414657 });
    setLoading(false);

    console.log("Latitude: " + lat);
    console.log("Longitude: " + long);
  }

  const callData = (param) => {
    let path = "";
    if (param === "1") {
      path = "currentNeighborHood";
    } else if (param === "2") {
      path = "findAllRes";
    } else if (param === "3") {
      path = "findResInDistance";
    } else {
      path = "0";
    }

    setActiveFuncName(param);
    getDataFromApi(path);
  };

  const getDataFromApi = (path) => {
    if (path !== "0") {
      axios
        .post(`http://localhost:9000/api/${path}`, curLocation)
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

  return (
    <div style={{ display: "flex" }}>
      <Restaurants
        curLocation={curLocation}
        activeFuncName={activeFuncName}
        data={data}
      />
      <div style={{ padding: "10px" }}>
        <h4 onClick={() => callData("0")}>Reset</h4>
        <h2 onClick={() => callData("1")}>Find the Current Neighborhood</h2>
        <h2 onClick={() => callData("2")}>
          Find all Restaurants in the Neighborhood
        </h2>
        <h2 onClick={() => callData("3")}>
          Find Restaurants within a Distance
        </h2>
      </div>
    </div>
  );
}