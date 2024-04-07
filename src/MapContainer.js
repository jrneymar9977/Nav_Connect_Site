import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import mainurl from "./constants";
import locationIcon from "./location.png";

function MapContainer({ onSelectPoint }) {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [lat, setLat] = useState(12.872597);
  const [lng, setLng] = useState(80.221548);

  useEffect(() => {
    const mapInstance = L.map("map").setView([lat, lng], 15);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 20,
    }).addTo(mapInstance);

    const customIcon = L.icon({
      iconUrl: locationIcon,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

    const markerInstance = L.marker([lat, lng], { icon: customIcon, draggable: true }).addTo(
      mapInstance
    );

    setMap(mapInstance);
    setMarker(markerInstance);

    mapInstance.on("move", function () {
      // Update marker's position continuously while dragging
      const newCenter = mapInstance.getCenter();
      markerInstance.setLatLng(newCenter);
    });

    mapInstance.on("moveend", function () {
      // Update state and call onSelectPoint when dragging stops
      const newCenter = mapInstance.getCenter();
      setLat(newCenter.lat);
      setLng(newCenter.lng);
      onSelectPoint(newCenter.lat, newCenter.lng);
    });

    return () => {
      mapInstance.remove();
    };
  }, [onSelectPoint]);

  return (
    <div className="map-container">
      <div id="map" className="map"></div>
    </div>
  );
}

export default MapContainer;
