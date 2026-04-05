import { useState } from "react";
import Layout from "../components/layout/Layout";
import useCampaigns from "../features/campaigns/useCampaigns";
import Dashboard from "../features/dashboard/Dashboard";
import CampaignModal from "../features/campaigns/CampaignModal";

export default function DashboardPage() {
  const { data, refetch } = useCampaigns();
  const [open, setOpen] = useState(false);

  return (
    <Layout>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        {/* ✅ CREATE BUTTON */}
        <button
          onClick={() => setOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          + New Campaign
        </button>
      </div>

      {/* DASHBOARD CONTENT */}
      <Dashboard campaigns={data} />

      {/* MODAL */}
      {open && (
        <CampaignModal
          onClose={() => setOpen(false)}
          onSuccess={refetch}
        />
      )}
    </Layout>
  );
}