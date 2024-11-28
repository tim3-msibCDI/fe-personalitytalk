export function SkeletonCard() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-5">
        {Array(4).fill(0).map((_, index) => (
          <div key={index} className="bg-gray-300 animate-pulse p-5 rounded-lg flex items-center space-x-4">
            <div className="bg-gray-400 w-12 h-12 rounded-full"></div>
            <div className="space-y-2">
              <div className="bg-gray-400 w-32 h-4"></div>
              <div className="bg-gray-400 w-16 h-6"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  