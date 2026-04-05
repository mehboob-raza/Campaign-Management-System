import { useEffect, useState } from "react";
import client from "../../api/client";

export default function useCampaigns() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    setLoading(true);
    const res = await client.get("/campaigns");
    setData(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  return { data, loading, refetch: fetch };
}