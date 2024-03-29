import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import mainurl from "./constants";
import locationIcon from "./location.png"; // Import your custom marker image
import AddRoutes from "./AddRoutes";

function MapContainer(props) {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [lat, setLat] = useState(12.872597); // Initialize with default latitude
  const [lang, setLang] = useState(80.221548); // Initialize with default longitude

  useEffect(() => {
    const mapInstance = L.map("map").setView([lat, lang], 15);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 20,
    }).addTo(mapInstance);

    const customIcon = L.icon({
      iconUrl: locationIcon,
      iconSize: [32, 32], // Set the size of the icon
      iconAnchor: [16, 32], // Set the anchor point of the icon
    });

    const markerInstance = L.marker([lat, lang], { icon: customIcon }).addTo(mapInstance);

    setMap(mapInstance);
    setMarker(markerInstance);
  
    mapInstance.on("move", function () {
      const newCenter = mapInstance.getCenter();
      props.onLatLngChange(newCenter.lat, newCenter.lng);
      setLat(newCenter.lat); 
      setLang(newCenter.lng); 
      markerInstance.setLatLng(newCenter); 
    });

    return () => {
      mapInstance.remove();
    };
  }, []);

  return (
    <div className=" map-container">
      <p>Lat: {lat}</p>
      <p>Lang: {lang}</p>
      <div id="map" className=" map">
      </div>
      
    </div>
  );
}

export default MapContainer;
