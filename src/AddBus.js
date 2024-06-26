import axios from "axios";
import { useState, useEffect } from "react";
import "./Bus.css";
import mainurl from "./constants";

const AddBus = () => {
  const [busno, setBusno] = useState("");
  const [driver_id, setDriver_id] = useState("");
  const [route_id, setRoute_id] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const [busData, setBusData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${mainurl}/api/busdetails/`);
        setBusData(response.data);
      } catch (error) {
        console.error("Error fetching driver data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${mainurl}/api/createbus/`, {
        busno: busno,
        driver: driver_id,
        route: route_id
      });
      console.log("Response:", response.data);
      setBusno("");
      setDriver_id("");
      setRoute_id("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  var num = 0;
  return (
    <>
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
        <button className="btn btn-primary bg-[#062e61] text-white font-bold py-2 px-4 mb-2 rounded-lg" onClick={toggleModal}>
          Add Bus
        </button>
      </div>
      <div className="bors rounded-xl">
        <table className="tabl">
          <thead className="bg-[#062e61] text-white">
            <tr>
              <th className="text-center py-3 px-10  uppercase font-semibold text-sm">
                ID
              </th>
              <th className="text-center py-3 px-10  uppercase font-semibold text-sm">
                Bus No
              </th>
              <th className="text-center py-3 px-12  uppercase font-semibold text-sm">
                Driver
              </th>
              <th className="text-center py-3 px-24  uppercase font-semibold text-sm">
                Route
              </th>
            </tr>
          </thead>
          <tbody>
            {busData.map((bus) => {
              num++;

              if (num % 2 === 0) {
                return (
                  <tr key={bus.id} className="boxs1">
                    <td className=" py-3 text-center">{bus.bus_id}</td>
                    <td className=" py-3 text-center border-l-2">
                      {bus.bus_no}
                    </td>
                    <td className=" py-3 text-center border-l-2">
                      {bus.driver_name}
                    </td>
                    <td className=" py-3 text-center border-l-2">
                      {bus.route_title}
                    </td>
                  </tr>
                );
              } else {
                return (
                  <tr key={bus.id} className="boxs2">
                    <td className=" py-3 text-center">{bus.bus_id}</td>
                    <td className=" py-3 text-center border-l-2">
                      {bus.bus_no}
                    </td>
                    <td className=" py-3 text-center border-l-2">
                      {bus.driver_name}
                    </td>
                    <td className=" py-3 text-center border-l-2">
                      {bus.route_title}
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
    {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={toggleModal}>
              X
            </button>
            <div className="busform">
              <div className="flex">
                <h2 className="mx-auto mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Add Bus
                </h2>
              </div>

        <div className="mt-2">
         <form className="sm:mx-auto sm:w-full sm:max-w-sm space-y-6" method="POST" onSubmit={handleSubmit}>
           <div>
             <label htmlFor="busno" className="block text-sm font-medium leading-6 text-gray-900">
              Busno
            </label>
           <div className="mt-2">
              <input
                id="busno"
                name="busno"
                type="text"
                value={busno}
                onChange={(e) => setBusno(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="driver_id" className="block text-sm font-medium leading-6 text-gray-900">
              Driver ID
            </label>
            <div className="mt-2">
              <input
                id="driver_id"
                name="driver_id"
                type="text"
                value={driver_id}
                onChange={(e) => setDriver_id(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
             <label htmlFor="route_id" className="block text-sm font-medium leading-6 text-gray-900">
              Route ID
            </label>
           <div className="mt-2">
              <input
                id="route_id"
                name="route_id"
                type="text"
                value={route_id}
                onChange={(e) => setRoute_id(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div></div></div>
     )}
  
    </>
  );
};
export default AddBus;
