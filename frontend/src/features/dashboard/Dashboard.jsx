import Layout from "../components/layout/Layout";
import useCampaigns from "../features/campaigns/useCampaigns";
import CampaignTable from "../features/campaigns/CampaignTable";

export default function DashboardPage() {
  const { data, loading } = useCampaigns();

  if (loading) return <p>Loading...</p>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <CampaignTable data={data} />
    </Layout>
  );
}