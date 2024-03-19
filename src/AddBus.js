import axios from "axios";
import { useState, useEffect } from "react";

const AddBus = () => {
  const [busno, setBusno] = useState("");
  const [driver_id, setDriver_id] = useState("");

const [busData, setBusData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/busdetails/'); 
        setBusData(response.data);
      } catch (error) {
        console.error('Error fetching driver data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/busdetails/", {
        busno: busno,
        driver: driver_id
      });
      console.log("Response:", response.data);
      setBusno("");
      setDriver_id("");

    }
    catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    // <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    //   <div className="sm:mx-auto sm:w-full sm:max-w-sm">

    //     <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
    //       Add Bus
    //     </h2>
    //   </div>

    //   <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    //     <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
    //       <div>
    //         <label htmlFor="busno" className="block text-sm font-medium leading-6 text-gray-900">
    //           busno
    //         </label>
    //         <div className="mt-2">
    //           <input
    //             id="busno"
    //             name="busno"
    //             type="text"
    //             value={busno}
    //             onChange={(e) => setBusno(e.target.value)}
    //             required
    //             className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //           />
    //         </div>
    //       </div>
    //       <div>
    //         <label htmlFor="driver_id" className="block text-sm font-medium leading-6 text-gray-900">
    //           driver_id
    //         </label>
    //         <div className="mt-2">
    //           <input
    //             id="driver_id"
    //             name="driver_id"
    //             type="text"
    //             value={driver_id}
    //             onChange={(e) => setDriver_id(e.target.value)}
    //             required
    //             className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //           />
    //         </div>
    //       </div>
    //       <div>
    //         <button
    //           type="submit"
    //           className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    //         >
    //           Submit
    //         </button>
    //       </div>
    //     </form>
    //   </div>
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
      <button class="btn btn-primary bg-[#062e61] text-white font-bold py-2 px-4 rounded-lg">
  Add Bus
</button>
      </div>
      <table className="bg-white mx-auto min-w-64 rounded-2xl overflow-hidden">
        <thead className="bg-[#062e61] text-white">
          <tr>
            <th className="text-center py-3 px-10  uppercase font-semibold text-sm">ID</th>
            <th className="text-center py-3 px-10  uppercase font-semibold text-sm">Bus No</th>
            <th className="text-center py-3 px-12  uppercase font-semibold text-sm">Driver</th>
            <th className="text-center py-3 px-24  uppercase font-semibold text-sm">Route</th>
          </tr>
        </thead>
        <tbody>
          {busData.map((bus) => (
            <tr key={bus.id} className="border-r-2 border-b-2  border-l-2">
              <td className=" py-3 text-center border-l-2">{bus.bus_id}</td>
              <td className=" py-3 text-center border-l-2">{bus.bus_no}</td>
              <td className=" py-3 text-center border-l-2">{bus.driver_name}</td>
              <td className=" py-3 text-center border-l-2">{bus.route_title}</td>
              {/* cddaeb */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default AddBus;
