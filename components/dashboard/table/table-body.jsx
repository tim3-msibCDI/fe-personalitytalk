export default function TableBody({ rows, columns }) {
  return (
    <tbody>
      {rows.map((row, index) => (
        <tr key={row.id || index} className="border border-text2">
          {columns.map(({ key, render }, colIndex) => (
            <td key={colIndex} className="px-4 py-2 border border-text2">
              {render ? render(row[key], row, index) : row[key]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
