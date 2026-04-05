import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="hidden md:flex w-64 bg-white dark:bg-gray-800 p-4 shadow">
      <div>
        <h1 className="text-xl font-bold mb-6">AdAgency</h1>

        <NavLink to="/" className="block mb-2">Dashboard</NavLink>
        <NavLink to="/brief">Creative Brief</NavLink>
      </div>
    </div>
  );
}