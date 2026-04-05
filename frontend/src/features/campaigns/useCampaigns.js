import { useEffect, useState } from "react";
import client from "../../api/client";

export default function useCampaigns() {
  const [data, setData] = useState([]);

  const fetch = async () => {
    const res = await client.get("/campaigns");
    setData(res.data);
  };

  useEffect(() => {
    fetch();
  }, []);

  return { data, refetch: fetch };
}