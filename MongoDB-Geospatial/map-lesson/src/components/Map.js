import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import React from "react";

export default function Map() {
  return (
    <MapContainer center={[46.8625, 103.8467]} zoom={5} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[47.919, 106.91759995544909]}>
        <Popup>Sukhbaatar Square</Popup>
      </Marker>
    </MapContainer>
  );
}
