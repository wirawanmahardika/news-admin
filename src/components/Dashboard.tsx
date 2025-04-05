import { useState } from "react";
import Bars3 from "../icons/bars3";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { myAxios } from "../utils/axios";
import useAuthenticate from "../hooks/useAuthenticate";

export default function Dashboard() {
  useAuthenticate()
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const logout = async () => {
    const res = await myAxios.delete("/api/v1/logout");
    if (res.status < 300) navigate("/login");
  };

  return (
    <>
      <div className="w-full h-screen flex font-geologica overflow-hidden">
        <div
          className={`overflow-hidden bg-stone-900 ${isOpen ? "w-1/6" : "w-0"}`}
          style={{ transition: "width 0.3s" }}
        >
          <Navbar />
        </div>
        <div
          className={`overflow-y-auto ${isOpen ? "w-5/6" : "w-full"}`}
          style={{ transition: "width 0.3s" }}
        >
          <div className="w-full h-[8vh] bg-sky-700 flex p-4 items-center justify-between gap-x-3">
            <div className="gap-x-5 items-center flex">
              <Bars3 onClick={() => setIsOpen((prev) => !prev)} />
              <span className="font-bold text-xl text-white">Admin</span>
            </div>
            <button
              onClick={logout}
              className="bg-black px-5 py-1 rounded text-white"
            >
              Logout
            </button>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
