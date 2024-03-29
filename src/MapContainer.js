import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import mainurl from "./constants";


function MapComponent(props) {
  const [map, setMap] = useState(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const mapInstance = L.map("map").setView([12.872597, 80.221548], 15);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 20,
    }).addTo(mapInstance);

    setMap(mapInstance);

    console.log("test lat lang" + props.lat + " , " + props.lang);

    var newlat = props.lat;
    var newlang = props.lang;
    mapInstance.setView([newlat, newlang]);

    return () => {
      mapInstance.remove();
    };
  }, []);

 

  return (
    <div className="map-container">
      
      <div id="map" className="map"></div>
    </div>
  );
}

export default MapComponent;
