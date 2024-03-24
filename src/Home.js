import React from "react";
import Map from './Map.js'
import './Map.css';

const Home = () => {
  return (
    <div className="">
      <div className="flex mt-4">
        <h1 className=" mx-auto text-2xl text-center font-semibold mb-4">Home</h1>
      </div>
      <div className="flex mx-20">
        <Map />
      </div>


    </div>
  );
};

export default Home;
