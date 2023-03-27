import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import React, { useState } from "react";
const coords = [
  { lat: 41.19197, lng: 25.33719 },
  { lat: 41.26352, lng: 25.1471 },
  { lat: 41.26365, lng: 25.24215 },
  { lat: 41.26369, lng: 25.33719 },
  { lat: 41.26365, lng: 25.43224 },
  { lat: 41.26352, lng: 25.52728 },
  { lat: 41.2633, lng: 25.62233 },
  { lat: 41.263, lng: 25.71737 },
  { lat: 41.3082, lng: 22.95892 },
  { lat: 41.31041, lng: 23.054 },
];

export default function MapMarkers() {
  const [markers, setMarker] = useState(coords);

  return (
    <MapContainer center={[46.8625, 103.8467]} zoom={5} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {markers.map(({ lat, lng }, index) => (
        <Marker position={[lat, lng]} key={index}>
          <Popup>
            {index + 1} is for popup with lat: {lat} and lon {lng}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
