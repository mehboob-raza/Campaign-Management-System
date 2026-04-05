import { useMemo } from "react";
import KPI from "./KPI";
import CampaignTable from "../campaigns/CampaignTable";

export default function Dashboard({ campaigns }) {
  const stats = useMemo(() => {
    return {
      totalCampaigns: campaigns.length,
      totalClicks: campaigns.reduce((a, b) => a + (b.clicks || 0), 0),
      totalSpend: campaigns.reduce((a, b) => a + Number(b.spend || 0), 0),
    };
  }, [campaigns]);

  return (
    <div className="space-y-6">
      {/* KPI SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KPI title="Campaigns" value={stats.totalCampaigns} />
        <KPI title="Clicks" value={stats.totalClicks} />
        <KPI title="Spend" value={`$${stats.totalSpend}`} />
      </div>

      {/* TABLE */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <CampaignTable data={campaigns} />
      </div>
    </div>
  );
}