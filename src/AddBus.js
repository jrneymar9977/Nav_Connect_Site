import axios from "axios";
import { useState } from "react";

const AddBus = () => {
  const [busno, setBusno] = useState("");
  const [driver_id, setDriver_id] = useState("");
 

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/createbus/", {
       busno:busno,
       driver:driver_id
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
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">

        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Add Bus
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="busno" className="block text-sm font-medium leading-6 text-gray-900">
              busno
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
              driver_id
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
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddBus;