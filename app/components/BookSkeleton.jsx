import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const BookSkeleton = () => {
    return (
    <SkeletonTheme  baseColor="#D7DBE0" highlightColor="#ffffff">
    <div className="overflow-hidden w-44 bg-white mx-auto py-3 flex flex-col items-center justify-center custom-pulse">
      <div className="mx-auto">
          <Skeleton width={155} height={192} />
      </div>
      <div className=" flex items-center justify-center flex-col">
        <h2 className="mt-3 text-sm ">
          <Skeleton width={80} height={16} />
        </h2>
        <p className="text-center mb-1 text-black/[0.9]">
          <Skeleton width={100} height={12} />
        </p>
        <div className="flex justify-center items-center text-black/[0.5] mt-2 mb-4">
          <div className="flex items-center justify-center">
            <p className="text-lg font-semibold">
              <Skeleton width={40} height={16} />
            </p>
          </div>
        </div>
      </div>
      <button className="cursor-not-allowed">
        <Skeleton width={80} height={24} />
      </button>
    </div>
    </SkeletonTheme>
  );
};

export default BookSkeleton;
