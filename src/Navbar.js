import { useState } from "react";
import { Link } from 'react-router-dom';


const Navbar = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: 'Add Drivers', src: 'User', path: '/drivers' },
    { title: 'Add Buses', src: 'bus', path: '/buses' },
    { title: 'Add Routes', src: 'routes', path: '/add-routes' },
    { title: 'Bus Management', src: 'Calendar', path: '/bus-management' },
    { title: 'Settings', src: 'Setting', path: '/settings' },
  ];

  return (
    <div className="flex ">
      <div
        className={`${open ? "w-72" : "w-20"
          } min-h-screen bg-slate-700 p-5 rounded-3xl pt-8 mt-3 mb-3 relative duration-300`}>
        <img
          src="./images/control.png" alt="control"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <Link to={'/'}>
            <div className="flex items-center">
              <img
                src="/images/logo.png" alt="Logo"
                className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
              />
              <h1
                className={`text-white ml-2 origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`}
              >
                NavConnect
              </h1>
            </div>
          </Link>
        </div>

        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"
                } `}
            > <Link to={Menu.path} className="flex items-center">
                <img src={`/images/${Menu.src}.png`} alt="menu" />
                <span className={`flex px-4 ${!open && "hidden"} `}>
                  {Menu.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* <div className="h-screen flex-1 p-7">
        <h1 className="text-2xl font-semibold ">home</h1>
      </div> */}
    </div>
  );
};
export default Navbar;