export default function TableBody({ rows, columns }) {
  // Jika rows kosong, tampilkan fallback
  if (rows.length === 0) {
    return (
      <tbody>
        <tr>
          <td
            colSpan={columns.length}
            className="text-center p-20 text-textcolor text-h3"
          >
            Data tidak tersedia.
          </td>
        </tr>
      </tbody>
    );
  }

  // Jika rows berisi data, tampilkan baris
  return (
    <tbody>
      {rows.map((row, index) => (
        <tr key={row.id || index} className="border border-text2">
          {columns.map(({ key, render }, colIndex) => (
            <td
              key={colIndex}
              className="px-4 py-2 border border-text2 text-center"
            >
              {render ? render(row[key], row, index) : row[key]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
