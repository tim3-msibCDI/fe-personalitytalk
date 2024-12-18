export function SkeletonTable({ columnCount = 5, rowCount = 5 }) {
  return (
    <div className="relative flex items-center justify-center h-[400px] rounded-md">
      {/* Spinner Loading */}
      <div className="flex flex-col items-center">
        {/* Circular Progress */}
        <svg className="h-20 w-20 animate-spin" viewBox="0 0 100 100">
          <circle
            className="text-gray-300"
            cx="50"
            cy="50"
            r="45"
            strokeWidth="10"
            fill="none"
            stroke="currentColor"
          />
          <circle
            className="text-orange-500"
            cx="50"
            cy="50"
            r="45"
            strokeWidth="10"
            fill="none"
            strokeDasharray="220" // Circumference of the circle
            strokeDashoffset="70" // Offset for the orange segment
            strokeLinecap="round"
            stroke="currentColor"
          />
        </svg>

        {/* Loading Text */}
        <p className="mt-4 text-primary text-lg font-normal">Memuat data...</p>
      </div>
    </div>
  );
}
