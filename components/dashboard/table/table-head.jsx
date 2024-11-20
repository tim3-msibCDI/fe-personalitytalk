export default function TableHead({heads}) {
    return (
      <thead className="bg-primary text-whitebg font-medium">
        <tr>
          {heads.map((head) => (
            <th key={head} className="px-4 py-2 border border-text2">
              {head}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
  