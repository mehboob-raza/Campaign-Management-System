import { useState } from "react";
import client from "../../api/client";

export default function CampaignModal({ onClose, onSuccess }) {
  const [name, setName] = useState("");
  const [clientName, setClientName] = useState("");

  const submit = async () => {
    await client.post("/campaigns", {
      name,
      client: clientName,
      status: "active",
      budget: 1000,
      spend: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0,
    });

    onSuccess();
    onClose();
  };

  return (
    // FULL SCREEN OVERLAY (GRAY BACKGROUND)
    <div className="fixed inset-0 bg-gray-900/60 flex items-center justify-center z-50">

      {/* DIALOG BOX */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-lg p-8">

        {/* TITLE */}
        <h2 className="text-xl font-semibold text-center mb-6">
          Create Campaign
        </h2>

        {/* FORM CONTENT (CENTERED COLUMN) */}
        <div className="flex flex-col gap-5">

          <input
            placeholder="Campaign Name"
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Client Name"
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setClientName(e.target.value)}
          />

        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-center gap-4 mt-8">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={submit}
            className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Create
          </button>

        </div>
      </div>
    </div>
  );
}