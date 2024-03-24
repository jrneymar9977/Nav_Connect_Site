import axios from "axios";
import { useState, useEffect } from "react";
import './Drivers.css';

const Drivers = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);




  const [driverData, setDriverData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/drivers');
        setDriverData(response.data);
      } catch (error) {
        console.error('Error fetching driver data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/drivers/", {
        user: {
          first_name: firstname,
          last_name: lastname,
          email: email,
          password: password,
          username: `${firstname}${lastname}`,
          user_type: "Driver"
        },

        name: `${firstname}${lastname}`,
        phone_number: phone_number

      });

      console.log("Response:", response.data);

      setFirstname("");
      setLastname("");
      setEmail("");
      setPhoneNumber("");
      setPassword("");
      toggleModal();
      window.location.reload();


    }
    catch (error) {
      console.error("Error:", error);
    }
  };

  var num = 0;

  return (
    <>
      <div className="driverdata container mt-14 ">
        <div className="flex items-center justify-center pt-10 mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Bus"
              className="carter-one-regular placeholder-black font-bold font- text-black bg-[#cddaeb] h-12 w-96 px-5 rounded-2xl text-xl focus:outline-none"
            />
            <button
              type="submit"
              className="absolute right-0 px-4 rounded mt-2">
              <img className="" src="/images/search.png" alt="Logo"></img>
            </button>
          </div>
        </div>

        <div className="flex justify-end mr-52">
          <button class="btn btn-primary bg-[#062e61] text-white font-bold py-2 px-4 mb-4 rounded-lg" onClick={toggleModal}>
            Add Driver
          </button>
        </div>
        <div className="bord">
          <table className="tablu">
            <thead className="bg-[#062e61] text-white">
              <tr>
                <th className="text-center py-3 px-10  uppercase font-semibold text-sm">ID</th>
                <th className="text-center py-3 px-10  uppercase font-semibold text-sm">Driver</th>
                <th className="text-center py-3 px-12  uppercase font-semibold text-sm">Phone_Number</th>
                <th className="text-center py-3 px-24  uppercase font-semibold text-sm">Email_ID</th>
              </tr>
            </thead>
            <tbody>
              {driverData.map((driver) => {
                num++
                if (num % 2 === 0) {
                  return (
                    <tr key={driver.id} className="box1">
                      <td className=" py-3 text-center">{driver.id}</td>
                      <td className=" py-3 text-center border-l-2">{driver.name}</td>
                      <td className=" py-3 text-center border-l-2">{driver.phone_number}</td>
                      <td className=" py-3 text-center border-l-2">{driver.email}</td>
                    </tr>
                  );
                }
                else {
                  return (
                    <tr key={driver.id} className="box2">
                      <td className=" py-3 text-center ">{driver.id}</td>
                      <td className=" py-3 text-center border-l-2">{driver.name}</td>
                      <td className=" py-3 text-center border-l-2">{driver.phone_number}</td>
                      <td className=" py-3 text-center border-l-2">{driver.email}</td>
                    </tr>
                  );
                }

              })}
            </tbody>
          </table></div>
      </div>
      {
        isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="modal-close" onClick={toggleModal}>X</button>
              <div className="driverform">
                <div className="flex">
                  <h2 className="mx-auto mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Add Driver
                  </h2>
                </div>

                <div className="mt-2">
                  <form className="sm:mx-auto sm:w-full sm:max-w-sm space-y-6" method="POST" onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="Firstname" className="block text-sm font-medium leading-6 text-gray-900">
                        Firstname
                      </label>
                      <div className="mt-2">
                        <input
                          id="Firstname"
                          name="Firstname"
                          type="text"
                          value={firstname}
                          onChange={(e) => setFirstname(e.target.value)}
                          required
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="Lastname" className="block text-sm font-medium leading-6 text-gray-900">
                        Lastname
                      </label>
                      <div className="mt-2">
                        <input
                          id="Lastname"
                          name="Lastname"
                          type="text"
                          value={lastname}
                          onChange={(e) => setLastname(e.target.value)}
                          required
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="phone_number" className="block text-sm font-medium leading-6 text-gray-900">
                        phone_number
                      </label>
                      <div className="mt-2">
                        <input
                          id="phone_number"
                          name="phone_number"
                          type="text"
                          value={phone_number}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          required
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          autoComplete="email"
                          required
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                          Password
                        </label>
                      </div>
                      <div className="mt-2">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          autoComplete="current-password"
                          required
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
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
            </div>
          </div>
        )
      }
    </>
  );
};
export default Drivers;

