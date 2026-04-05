export default function CampaignTable({ data }) {
  return (
    <table className="w-full text-left">
      <thead>
        <tr className="border-b text-gray-500">
          <th>Name</th>
          <th>Client</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {data.map((c) => (
          <tr key={c.id} className="border-b hover:bg-gray-100">
            <td>{c.name}</td>
            <td>{c.client}</td>
            <td>{c.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}