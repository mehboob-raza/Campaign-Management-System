import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// API setup
const api = axios.create({
  baseURL: "http://localhost:5000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// SOCKET setup
const socket = io("http://localhost:5000");

export default function App() {
  const [campaigns, setCampaigns] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchCampaigns();

    socket.on("alert", (data) => {
      setAlerts((prev) => [data, ...prev]);
    });
  }, []);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const res = await api.get("/campaigns");
      setCampaigns(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Unauthorized! Please login.");
      } else {
        alert("Failed to fetch campaigns.");
      }
    } finally {
      setLoading(false);
    }
  };

  const createCampaign = async (form) => {
    try {
      await api.post("/campaigns", {
        ...form,
        status: "active",
        budget: 1000,
        spend: 0,
        impressions: 0,
        clicks: 0,
        conversions: 0,
      });
      fetchCampaigns();
      setShowModal(false);
    } catch {
      alert("Failed to create campaign.");
    }
  };

  const filtered = campaigns.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalSpend = campaigns.reduce((a, b) => a + Number(b.spend || 0), 0);

  return (
    <div className="flex h-screen font-sans bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* SIDEBAR */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 p-6 shadow-lg transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:flex flex-col`}
      >
        <h1 className="text-3xl font-bold mb-8 text-indigo-600">AdAgency</h1>
        <nav className="flex flex-col gap-3">
          <button className="p-3 rounded-lg hover:bg-indigo-100 dark:hover:bg-gray-700 transition">
            Dashboard
          </button>
          <button className="p-3 rounded-lg hover:bg-indigo-100 dark:hover:bg-gray-700 transition">
            Campaigns
          </button>
          <button className="p-3 rounded-lg hover:bg-indigo-100 dark:hover:bg-gray-700 transition">
            Analytics
          </button>
        </nav>
      </div>

      {/* MOBILE NAVBAR TOGGLE */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-indigo-600 text-white rounded-lg shadow-lg"
        >
          ☰
        </button>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* NAVBAR */}
        <div className="flex justify-between items-center p-6 bg-white dark:bg-gray-800 shadow-md sticky top-0 z-20">
          <h2 className="text-2xl font-semibold">Dashboard</h2>

          <div className="flex items-center gap-6">
            <button
              onClick={() =>
                document.documentElement.classList.toggle("dark")
              }
              className="text-xl"
            >
              🌙
            </button>

            <div className="relative group">
              <button className="relative">
                🔔
                {alerts.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {alerts.length}
                  </span>
                )}
              </button>
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-700 rounded-lg shadow-lg p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                {alerts.length ? (
                  alerts.map((a, i) => (
                    <p key={i} className="border-b py-2">
                      {a.message}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-500">No alerts</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* SEARCH + BUTTON */}
          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            <input
              placeholder="Search campaigns..."
              className="border p-3 rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={() => setShowModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition"
            >
              + New Campaign
            </button>
          </div>

          {/* KPI CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card title="Campaigns" value={campaigns.length} />
            <Card title="Total Spend" value={`$${totalSpend}`} />
            <Card
              title="Clicks"
              value={campaigns.reduce((a, b) => a + b.clicks, 0)}
            />
          </div>

          {/* CHART */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Performance Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={campaigns}>
                <Line
                  type="monotone"
                  dataKey="clicks"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* TABLE */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-100 dark:bg-gray-700 rounded-lg">
                <tr>
                  <th className="text-left px-4 py-2">Name</th>
                  <th className="text-left px-4 py-2">Client</th>
                  <th className="text-left px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={3} className="text-center py-6">
                      Loading campaigns...
                    </td>
                  </tr>
                ) : filtered.length ? (
                  filtered.map((c) => (
                    <tr
                      key={c.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    >
                      <td className="px-4 py-2">{c.name}</td>
                      <td className="px-4 py-2">{c.client}</td>
                      <td className="px-4 py-2">
                        <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm">
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center py-6 text-gray-500">
                      No campaigns found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <CampaignModal
          onClose={() => setShowModal(false)}
          onSubmit={createCampaign}
        />
      )}
    </div>
  );
}

// KPI CARD
function Card({ title, value }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col justify-between">
      <p className="text-gray-500 dark:text-gray-300">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
    </div>
  );
}

// MODAL
function CampaignModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({ name: "", client: "" });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl w-11/12 max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-6">New Campaign</h2>

        <input
          placeholder="Name"
          className="border p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Client"
          className="border p-3 w-full mb-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setForm({ ...form, client: e.target.value })}
        />

        <div className="flex justify-end gap-4 flex-wrap">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit(form)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}