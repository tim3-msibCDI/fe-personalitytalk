export function SkeletonTable({ columnCount = 5, rowCount = 5 }) {
  return (
    <div className="relative">
      {/* Spinner Loading */}
      <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-8 border-r-4 border-primary"></div>
        <p className="ml-4 text-primary text-lg">Memuat data...</p>
      </div>

      {/* Skeleton Table */}
      <table className="w-full min-w-max bg-primarylight2 border border-text2 text-center text-s">
        <thead>
          <tr>
            {Array.from({ length: columnCount }).map((_, index) => (
              <th
                key={index}
                className="p-2 border border-gray-100 bg-gray-100 h-6 rounded-md animate-pulse"
              >
                <ul className="mt-2 space-y-2">
                  <li className="w-full h-4 bg-gray-200 rounded-full"></li>
                </ul>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <tr key={rowIndex} className="animate-pulse">
              {Array.from({ length: columnCount }).map((_, colIndex) => (
                <td
                  key={colIndex}
                  className="p-2 border border-gray-100 bg-gray-100 h-6 rounded-md"
                >
                  <div className="flex animate-pulse">
                    <div className="ms-4 mt-2 w-full">
                      {/* List of additional placeholders */}
                      <ul className="mt-2 space-y-2">
                        <li className="w-full h-4 bg-gray-200 rounded-full"></li>
                      </ul>
                    </div>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
