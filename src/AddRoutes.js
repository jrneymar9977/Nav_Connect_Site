import axios from "axios";
import { useState, useEffect } from "react";
import './Routes.css';

const AddRoutes = () => {
  const [routename, setRouteName] = useState("");
  const [busid, setBusId] = useState("");
  const [route_name, setRoute_Name] = useState("");
  const [order, setOrder] = useState("");
  const [lat, setLat] = useState("");
  const [lang, setLang] = useState("");

  const [routeData, setRouteData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/busdetails/');
        setRouteData(response.data);
      } catch (error) {
        console.error('Error fetching driver data:', error);
      }
    };

    fetchData();
  }, []);

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
    // <div className="flex ml-6 mt-12">
    //   <form className="flex h-96" method="POST" onSubmit={handleSubmit}>
    //     <div className="flex h-32 w-56 mx-8 p-4 border-4 rounded-xl border-gray-500">
    //       <div>
    //         <label htmlFor="routename" className="block text-sm font-medium leading-6 text-gray-900">
    //           Route_Title
    //         </label>
    //         <div className="mt-2">
    //           <input
    //             id="routename"
    //             name="routename"
    //             type="text"
    //             value={routename}
    //             onChange={(e) => setRouteName(e.target.value)}
    //             required
    //             className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
    //           />
    //         </div>
    //       </div>
    //     </div>

    //     <div className="box-content p-4 mx-8 border-4 rounded-xl border-gray-500">
    //       <div className="flex ">
    //       <div className="">
    //         <label htmlFor="busid" className="block mx-2.5 text-sm font-medium leading-6 text-gray-900">
    //           busid
    //         </label>
    //         <div className="mt-2">
    //           <input
    //             id="busid"
    //             name="busid"
    //             type="text"
    //             value={busid}
    //             onChange={(e) => setBusId(e.target.value)}
    //             className="w-24 mx-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //           />
    //         </div>
    //       </div>

    //       <div>
    //         <label htmlFor="route_name" className="block mx-2.5 text-sm font-medium leading-6 text-gray-900">
    //           route_name
    //         </label>
    //         <div className="mt-2">
    //           <input
    //             id="route_name"
    //             name="route_name"
    //             type="text"
    //             value={route_name}
    //             onChange={(e) => setRoute_Name(e.target.value)}
    //             required
    //             className="mx-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //           />
    //         </div>
    //       </div>

    //       {/* <div>
    //         <label htmlFor="order" className="block text-sm font-medium leading-6 text-gray-900">
    //           order
    //         </label>
    //         <div className="mt-2">
    //           <input
    //             id="order"
    //             name="order"
    //             type="text"
    //             value={order}
    //             onChange={(e) => setOrder(e.target.value)}
    //             required
    //             className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //           />
    //         </div>
    //       </div> */}

    //       <div>
    //         <label htmlFor="lat" className="block mx-2.5 text-sm font-medium leading-6 text-gray-900">
    //           lat
    //         </label>
    //         <div className="mt-2">
    //           <input
    //             id="lat"
    //             name="lat"
    //             type="text"
    //             value={lat}
    //             onChange={(e) => setLat(e.target.value)}
    //             autoComplete="lat"
    //             required
    //             className="w-24 mx-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //           />
    //         </div>
    //       </div>

    //       <div>
    //         <div className="flex items-center justify-between">
    //           <label htmlFor="lang" className="block mx-2.5 text-sm font-medium leading-6 text-gray-900">
    //             lang
    //           </label>
    //         </div>
    //         <div className="mt-2">
    //           <input
    //             id="lang"
    //             name="lang"
    //             type="text"
    //             value={lang}
    //             onChange={(e) => setLang(e.target.value)}
    //             autoComplete="current-lang"
    //             required
    //             className="w-24 mx-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //           />
    //         </div>
    //       </div></div>

    //       <div>
    //         <button
    //           type="submit"
    //           className="flex mt-52 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
    //         >
    //           Submit
    //         </button>
    //       </div>
    //     </div>

    //     <div className="flex">
    //       <img className="w-64 rounded-md" src={`/images/map.jpg`} alt="map" />
    //     </div>
    //   </form>
    // </div>

    <div className="container mt-14">

      <div className="flex items-center justify-center pt-10 mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Bus"
            className="carter-one-regular placeholder-black font-bold font- text-black bg-[#cddaeb] h-12 w-96 px-5 rounded-2xl text-xl focus:outline-none"
          />
          <button
            type="submit"
            className="absolute right-0 px-4 rounded mt-2"
          >
            <img className="" src="/images/search.png" alt="Logo"></img>
          </button>
        </div>
      </div>
      <div className="flex justify-end mr-52">
        <button class="btn btn-primary bg-[#062e61] text-white font-bold py-2 px-4 mb-6  mx-2 rounded-lg">
          Upload CSV Routes
        </button>
        <button class="btn btn-primary bg-[#062e61] text-white font-bold py-2 px-4 mb-6 rounded-lg">
          Add Routes
        </button>
      </div>
      <table className="tablu bg-white mx-auto rounded-2xl overflow-hidden">
        <thead className="bg-[#062e61] text-white">
          <tr>
            <th className="text-center py-3 px-10  uppercase font-semibold text-sm">ID</th>
            <th className="text-center py-3 px-10  uppercase font-semibold text-sm">Routes</th>
            <th className="text-center py-3 px-12  uppercase font-semibold text-sm">In-Between Routes</th>
          </tr>
        </thead>
        <tbody>
        {routeData.map((route) => (
  <tr key={route.route_id} className="border-r-2 border-b-2 border-l-2">
    <td className="py-3 text-center border-l-2">{route.route_id}</td>
    <td className="py-3 text-center border-l-2">{route.route_title}</td>
    {/* Check if there are multiple stops in the route */}
    {route.routes.length > 1 && (
      <td className="py-3 text-center border-l-2">
        {/* Display "In-Between Stops" if there are more than one stop */}
        {/* Loop through each stop and display its name */}
        {route.routes.map((routeDetail, index) => (
          <span key={index}>
            {routeDetail.route_name}
            {index < route.routes.length - 1 && ", "}
          </span>
        ))}
      </td>
    )}
    {/* If there's only one stop, no need for "In-Between Stops" */}
    {route.routes.length === 1 && (
      <td className="py-3 text-center border-l-2">
        {route.routes[0].route_name}
      </td>
    )}
  </tr>
))}

        </tbody>
        
              </table>
    </div>

  );
};
export default AddRoutes;