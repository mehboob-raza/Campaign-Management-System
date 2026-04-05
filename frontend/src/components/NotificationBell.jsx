import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function NotificationBell() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    socket.on("alert", (data) => {
      setAlerts((prev) => [data, ...prev]);
    });
  }, []);

  return <div>🔔 {alerts.length}</div>;
}