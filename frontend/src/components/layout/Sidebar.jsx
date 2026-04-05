import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="hidden md:flex w-64 bg-white dark:bg-gray-800 flex-col p-4 shadow">
      <h1 className="text-xl font-bold mb-6">AdAgency</h1>

      <NavLink to="/" className="p-2 rounded hover:bg-gray-200">
        Dashboard
      </NavLink>

      <NavLink to="/brief" className="p-2 rounded hover:bg-gray-200">
        Creative Brief
      </NavLink>
    </div>
  );
}