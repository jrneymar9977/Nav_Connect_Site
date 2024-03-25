import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [inputValue, setInputValue] = useState('');
  
  useEffect(() => {
    const mapInstance = L.map('map').setView([12.872597, 80.221548], 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
    }).addTo(mapInstance);

    setMap(mapInstance);

    return () => {
      mapInstance.remove();
    };
  }, []);

  const handleButtonClick = () => {
    fetch("http://127.0.0.1:8000/api/searchroute/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"route": inputValue})
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      if (map) {
        const { lat, lang } = data;
        L.marker([lat, lang]).addTo(map);
        map.setView([lat, lang]);
      }
    })
    .catch((error) => console.error("Error:", error));	
  };

  return (
    <div className='map-container'>
      <input
        type="text"
        id="inp"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button id="btn" onClick={handleButtonClick}>search</button>
      <div id="map" className='map'></div>
    </div>
  );
};

export default MapComponent;
