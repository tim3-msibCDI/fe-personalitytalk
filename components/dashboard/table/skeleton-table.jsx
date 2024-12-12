export function SkeletonTable({ columnCount = 5, rowCount = 5 }) {
  return (
    <div className="relative">
      {/* Spinner Loading */}
      <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-8 border-r-4 border-primary"></div>
        <p className="ml-4 text-primary text-lg">Memuat data...</p>
      </div>

      {/* Skeleton Table */}
    </div>
  );
}
