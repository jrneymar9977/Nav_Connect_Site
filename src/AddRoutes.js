import axios from "axios";
import { useState } from "react";

const AddRoutes = () => {
  const [routename, setRouteName] = useState("");
  const [busid, setBusId] = useState("");
  const [route_name, setRoute_Name] = useState("");
  const [order, setOrder] = useState("");
  const [lat, setLat] = useState("");
  const [lang, setLang] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = {
        routename: routename,
        routes: [
          {
            route_name: route_name,
            order: parseInt(order),
            location: {
              lat: parseFloat(lat),
              lang: parseFloat(lang),
            },
          },
        ],
      };
      if (busid !== "") {
        data.bus_id = parseInt(busid);
      }

      const response = await axios.post("http://127.0.0.1:8000/api/createroutes/", data);
      console.log("Response:", response.data);

      setRouteName("");
      setBusId("");
      setRoute_Name("");
      setOrder("");
      setLat("");
      setLang("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex ml-6 mt-12">
      <form className="flex h-96" method="POST" onSubmit={handleSubmit}>
        <div className="flex h-32 w-56 mx-8 p-4 border-4 rounded-xl border-gray-500">
          <div>
            <label htmlFor="routename" className="block text-sm font-medium leading-6 text-gray-900">
              Route_Title
            </label>
            <div className="mt-2">
              <input
                id="routename"
                name="routename"
                type="text"
                value={routename}
                onChange={(e) => setRouteName(e.target.value)}
                required
                className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
              />
            </div>
          </div>
        </div>

        <div className="box-content p-4 mx-8 border-4 rounded-xl border-gray-500">
          <div className="flex ">
          <div className="">
            <label htmlFor="busid" className="block mx-2.5 text-sm font-medium leading-6 text-gray-900">
              busid
            </label>
            <div className="mt-2">
              <input
                id="busid"
                name="busid"
                type="text"
                value={busid}
                onChange={(e) => setBusId(e.target.value)}
                className="w-24 mx-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="route_name" className="block mx-2.5 text-sm font-medium leading-6 text-gray-900">
              route_name
            </label>
            <div className="mt-2">
              <input
                id="route_name"
                name="route_name"
                type="text"
                value={route_name}
                onChange={(e) => setRoute_Name(e.target.value)}
                required
                className="mx-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* <div>
            <label htmlFor="order" className="block text-sm font-medium leading-6 text-gray-900">
              order
            </label>
            <div className="mt-2">
              <input
                id="order"
                name="order"
                type="text"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div> */}
          
          <div>
            <label htmlFor="lat" className="block mx-2.5 text-sm font-medium leading-6 text-gray-900">
              lat
            </label>
            <div className="mt-2">
              <input
                id="lat"
                name="lat"
                type="text"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                autoComplete="lat"
                required
                className="w-24 mx-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="lang" className="block mx-2.5 text-sm font-medium leading-6 text-gray-900">
                lang
              </label>
            </div>
            <div className="mt-2">
              <input
                id="lang"
                name="lang"
                type="text"
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                autoComplete="current-lang"
                required
                className="w-24 mx-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div></div>

          <div>
            <button
              type="submit"
              className="flex mt-52 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            >
              Submit
            </button>
          </div>
        </div>

        <div className="flex">
          <img className="w-64 rounded-md" src={`/images/map.jpg`} alt="map" />
        </div>
      </form>
    </div>

  );
};
export default AddRoutes;