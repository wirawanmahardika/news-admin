import { useState } from "react";
import ArrowLeft from "../icons/ArrowLeft";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full flex flex-col text-gray-200">
      <div className="items-center flex justify-center gap-x-3 p-3  bg-black">
        <img src="/logo.png" alt="logo" className="size-8" />
        <span className="font-bold text-gray-200 text-2xl text-center">
          Dashboard
        </span>
      </div>

      <Link
        to={"/"}
        className="hover:text-sky-600 hover:bg-slate-800 bg-black border-y border-stone-700 p-1 flex justify-between px-2 items-center cursor-pointer"
      >
        Home
      </Link>

      <NavigationGroup height="h-14" name="News">
        <Link to={"/manage-news"}>Manage</Link>
        <Link to={"/tambah-news"}>Tambah</Link>
      </NavigationGroup>

      <NavigationGroup height="h-14" name="Category">
        <Link to={"/manage-category"}>Manage</Link>
        <Link to={"/tambah-category"}>Tambah</Link>
      </NavigationGroup>
    </nav>
  );
}

function NavigationGroup({
  name,
  height,
  children,
}: {
  height: string;
  name: string;
  children?: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      {" "}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="hover:text-sky-600 hover:bg-slate-800 bg-black border-y border-stone-700 p-1 flex justify-between px-2 items-center cursor-pointer"
      >
        <span className="">{name}</span>
        <ArrowLeft isRotate={isOpen} />
      </div>
      <div
        style={{ transition: "height 0.3s linear" }}
        className={`flex flex-col font-quicksand px-4 overflow-hidden ${isOpen ? `${height} py-1` : "h-0 py-0"
          }`}
      >
        {children}
      </div>
    </>
  );
}
