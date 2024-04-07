import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import MapContainer from "./MapContainer";
import "./Routes.css";
import "./Map.css";
import mainurl from "./constants";

const AddRoutes = () => {
  const [lat, setLat] = useState(12.872597);
  const [lang, setLang] = useState(80.221548);
  const [route_title, setRoute_title] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const [routeData, setRouteData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/createroute/`);
        setRouteData(response.data);
      } catch (error) {
        console.error("Error fetching driver data:", error);
      }
    };

    fetchData();
  }, []);

  const [routes, setRoutes] = useState(
    Array.from({ length: 5 }, () => ({
      route_name: "",
      lat: "",
      lang: "",
      isValid: false,
    }))
  );

  const [routeindex, setRouteIndex] = useState(0);
  const validateRow = (route) => {
    return (
        route.route_name.trim() !== "" &&
        route.lat.trim() !== "" &&
        route.lang.trim() !== ""
    );
  };

  


  const [rowCompletionStatus, setRowCompletionStatus] = useState(Array(5).fill(false));
  const updateRouteDetails = (index, field, value) => {
    setRoutes((prevRoutes) => {
      const updatedRoutes = prevRoutes.map((route, i) =>
        i === index
          ? {
            ...route,
            [field]: value,
            order: i + 1,
            isValid: validateRow({ ...route, [field]: value }),
          }
          : route
      );

      const isRowCompleted = validateRow(updatedRoutes[index]);
      setRowCompletionStatus((prevStatus) => {
        const newStatus = [...prevStatus];
        newStatus[index] = isRowCompleted;
        return newStatus;
      });

      if (index === updatedRoutes.length - 1 && value !== "") {
        return [
          ...updatedRoutes,
          { route_name: "", lat: "", lang: "", isValid: false },
        ];
      }

      return updatedRoutes;
    });
  };

  const onSelectMapPoint = useCallback((latitude, longitude) => {
    updateRouteDetails(routeindex, "lat", latitude.toString());
    updateRouteDetails(routeindex, "lang", longitude.toString());
  }, [routeindex, updateRouteDetails]); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasPartiallyFilled = routes.some(
      (route) =>
        validateRow(route) === false &&
        (route.route_name.trim() !== "" ||
          route.lat.trim() !== "" ||
          route.lang.trim() !== "")
    );

    if (hasPartiallyFilled) {
      alert(
        "Please fill in complete details for all subroutes or leave them empty."
      );
      return;
    }

    const filteredRoutes = routes.filter((route) => route.isValid);

    if (filteredRoutes.length === 0) {
      alert("Please fill in complete details for at least one subroute.");
      return;
    }

    const data = {
      route_title: route_title,
      subroutes: filteredRoutes.map((route) => ({
        ...route,
        order: route.order,
        location: { lat: route.lat, lang: route.lang },
      })),
    };

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/createroute/`, data);
      console.log("Response:", response.data);
      setRoute_title("");
      setRoutes(
        Array.from({ length: 5 }, () => ({
          route_name: "",
          lat: { lat },
          lang: { lang },
          isValid: false,
        }))
      );
    } catch (error) {
      console.error("Error submitting route data:", error);
    }
  };

  var num = 0;
  return (
    <div className="container mt-14">
      <div className="flex items-center justify-center pt-10 mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Bus"
            className="carter-one-regular placeholder-black font-bold font- text-black bg-[#cddaeb] h-12 w-96 px-5 rounded-2xl text-xl focus:outline-none"
          />
          <button type="submit" className="absolute right-0 px-4 rounded mt-2">
            <img className="" src="/images/search.png" alt="Logo"></img>
          </button>
        </div>
      </div>
      <div className="flex justify-end mr-52">
        <button className="btn btn-primary bg-[#062e61] text-white font-bold py-2 px-4 mb-6  mx-2 rounded-lg">
          Upload CSV Routes
        </button>
        <button
          className="btn btn-primary bg-[#062e61] text-white font-bold py-2 px-4 mb-6 rounded-lg"
          onClick={toggleModal}
        >
          Add Routes
        </button>
      </div>
      <div className="bor rounded-xl">
        <table className="tab">
          <thead className="bg-[#062e61] text-white">
            <tr>
              <th className="text-center py-3 px-10  uppercase font-semibold text-sm">
                ID
              </th>
              <th className="text-center py-3 px-10  uppercase font-semibold text-sm">
                Routes
              </th>
              <th className="text-center py-3 px-12  uppercase font-semibold text-sm">
                In-Between Routes
              </th>
            </tr>
          </thead>
          <tbody>
            {routeData.map((route) => {
              num++;
              if (num % 2 === 0) {
                return (
                  <tr key={route.route_id} className="box-1">
                    <td className="py-3 text-center ">{route.route_id}</td>
                    <td className="py-3 text-center border-l-2">
                      {route.route_title}
                    </td>
                    <td className="py-3 text-center border-l-2">
                      {route.subroutes.map((subroute, index) => (
                        <span key={index}>
                          {subroute.route_name}
                          {index < route.subroutes.length - 1 && "- "}
                        </span>
                      ))}
                    </td>
                  </tr>
                );
              } else {
                return (
                  <tr key={route.route_id} className="box-2">
                    <td className="py-3 text-center ">{route.route_id}</td>
                    <td className="py-3 text-center border-l-2">
                      {route.route_title}
                    </td>
                    <td className="py-3 text-center border-l-2">
                      {route.subroutes.map((subroute, index) => (
                        <span key={index}>
                          {subroute.route_name}
                          {index < route.subroutes.length - 1 && "- "}
                        </span>
                      ))}
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>

        </table>
      </div>
      {isModalOpen && (
        <div className="modal-overlay-route">
          <div className="modal-content-route">
            <button className="modal-close" onClick={toggleModal}>
              X
            </button>

            <div className="flex">
              <h2 className="mx-auto mt-4 mb-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Add Route
              </h2>
            </div>
            <div className="routeform ">
              <form className=" form-s" method="POST" onSubmit={handleSubmit}>
                <div className="flex  mx-14 mb-10">
                  <div>
                    <label
                      htmlFor="route_title"
                      className="block leading-6 font-bold text-black"
                    >
                      Route Title
                    </label>
                    <div className="mt-2">
                      <input
                        id="route_title"
                        name="route_title"
                        type="text"
                        value={route_title}
                        onChange={(e) => setRoute_title(e.target.value)}
                        required
                        className="block bg-gray-300 rounded-xl border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-text-gray-400 sm:text-sm sm:leading-6 p-2"
                      />
                    </div>
                  </div>
                </div>

                <div className="add-route">
                  <table className="tabs">
                    <thead className=" h-10 bg-[#062e61] text-white">
                      <tr className="">
                        <th className="text-center uppercase font-semibold text-sm">
                          route_name
                        </th>
                        <th className="text-center uppercase font-semibold text-sm">
                          Lat
                        </th>
                        <th className="text-center uppercase font-semibold text-sm">
                          Lang
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {routes.map((route, index) => (
                        <tr key={index}>
                          <td className="text-center h-10">
                            <input
                              type="text"
                              value={route.route_name}
                              onClick={() => setRouteIndex(index)}
                              onChange={(e) => updateRouteDetails(index, "route_name", e.target.value)}
                              className={`border-none py-1.5 text-gray-900 placeholder-text-gray-400 sm:text-sm sm:leading-6 ${index % 2 === 0 ? "bg-white" : "bg-[#cddaeb]"
                                }`}
                              disabled={index !== 0 && !rowCompletionStatus[index - 1]}
                            />
                          </td>
                          <td className="text-center h-10 border-l-2">
                            <input
                              type="text"
                              value={route.lat} 
                              onChange={(e) => updateRouteDetails(index, "lat", e.target.value)}
                              className={`max-w-24 border-none py-1.5 text-gray-900 placeholder-text-gray-400 sm:text-sm sm:leading-6 ${index % 2 === 0 ? "bg-white" : "bg-[#cddaeb]"
                                }`}
                              disabled={index !== 0 && !rowCompletionStatus[index - 1]}
                            />
                          </td>
                          <td className="text-center h-10 border-l-2">
                            <input
                              type="text"
                              value={route.lang} 
                              onChange={(e) => updateRouteDetails(index, "lang", e.target.value)}
                              className={`max-w-24 border-none py-1.5 text-gray-900 placeholder-text-gray-400 sm:text-sm sm:leading-6 ${index % 2 === 0 ? "bg-white" : "bg-[#cddaeb]"
                                }`}
                              disabled={index !== 0 && !rowCompletionStatus[index - 1]}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>


                  </table>
                  <div></div>
                </div>
                <button
                  type="submit"
                  className="form-btn flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500"
                >
                  Submit
                </button>
              </form>
              <div>
              </div>
              <MapContainer onSelectPoint={onSelectMapPoint} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AddRoutes;
