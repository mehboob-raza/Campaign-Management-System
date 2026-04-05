import NotificationBell from "../NotificationBell";

export default function Navbar() {
  return (
    <div className="flex justify-between p-4 bg-white dark:bg-gray-800 shadow">
      <h2>Dashboard</h2>

      <div className="flex gap-4">
        <NotificationBell />
      </div>
    </div>
  );
}