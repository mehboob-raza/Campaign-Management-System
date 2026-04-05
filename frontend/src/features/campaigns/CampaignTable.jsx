export default function CampaignTable({ data }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-300 dark:border-gray-700 text-center">
        
        {/* HEADER */}
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="border px-4 py-3">Name</th>
            <th className="border px-4 py-3">Client</th>
            <th className="border px-4 py-3">Status</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {data.map((c) => (
            <tr
              key={c.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              <td className="border px-4 py-3">{c.name}</td>
              <td className="border px-4 py-3">{c.client}</td>
              <td className="border px-4 py-3">
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    c.status === "active"
                      ? "bg-green-100 text-green-700"
                      : c.status === "paused"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {c.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* EMPTY STATE */}
      {!data.length && (
        <p className="text-center text-gray-500 mt-4">
          No campaigns found.
        </p>
      )}
    </div>
  );
}