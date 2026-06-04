import Shimmer from "./ui/Shimmer";

export default function SkeletonLoader() {
  return (
    <div className="min-h-screen font-sans" style={{ background: "#FAFAFA" }}>

      {/* Navbar skeleton */}
      <div
        className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-[#DBDBDB] bg-white"
      >
        <div className="flex items-center gap-3">
          <Shimmer style={{ width: 20, height: 20, borderRadius: 4 }} />
          <Shimmer style={{ width: 110, height: 18 }} />
        </div>
        <Shimmer style={{ width: 90, height: 18 }} />
      </div>

      <div className="max-w-[935px] mx-auto px-4 sm:px-8">

        {/* Profile header skeleton */}
        <div className="py-10 flex flex-col sm:flex-row items-center sm:items-start gap-8 sm:gap-16 border-b border-[#DBDBDB]">
          <Shimmer style={{ width: 150, height: 150, borderRadius: 999, flexShrink: 0 }} />
          <div className="flex flex-col gap-5 flex-1 w-full items-center sm:items-start">
            {/* Handle */}
            <Shimmer style={{ width: 180, height: 22 }} />
            {/* Stats row */}
            <div className="flex gap-8">
              <Shimmer style={{ width: 72, height: 18 }} />
              <Shimmer style={{ width: 72, height: 18 }} />
              <Shimmer style={{ width: 72, height: 18 }} />
            </div>
            {/* Bio */}
            <div className="flex flex-col gap-2 w-full">
              <Shimmer style={{ width: 150, height: 16 }} />
              <Shimmer style={{ width: "85%", height: 14 }} />
              <Shimmer style={{ width: "65%", height: 14 }} />
              <Shimmer style={{ width: 120, height: 13 }} />
            </div>
          </div>
        </div>

        {/* Tab bar skeleton */}
        <div className="py-4 border-b border-[#DBDBDB] flex justify-center sm:justify-start">
          <Shimmer style={{ width: 140, height: 14 }} />
        </div>

        {/* Toolbar skeleton */}
        <div className="py-4 flex gap-3">
          <Shimmer style={{ flex: 1, height: 40, borderRadius: 12 }} />
          <Shimmer style={{ width: 64, height: 40, borderRadius: 12 }} />
          <Shimmer style={{ width: 52, height: 40, borderRadius: 12 }} />
          <Shimmer style={{ width: 68, height: 40, borderRadius: 12 }} />
        </div>

        {/* Repo grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl overflow-hidden"
              style={{ border: "1px solid #EFEFEF" }}
            >
              <Shimmer style={{ height: 3, borderRadius: 0 }} />
              <div className="p-4 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <Shimmer style={{ width: "55%", height: 16 }} />
                  <Shimmer style={{ width: 36, height: 18, borderRadius: 999 }} />
                </div>
                <Shimmer style={{ width: "88%", height: 13 }} />
                <Shimmer style={{ width: "70%", height: 13 }} />
                <div className="flex items-center gap-3 pt-1 border-t border-[#F5F5F5]">
                  <Shimmer style={{ width: 68, height: 13, borderRadius: 999 }} />
                  <Shimmer style={{ width: 36, height: 13, marginLeft: "auto" }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
