import Image from 'next/image';
import Link from 'next/link';

interface Package {
  package_id: number;
  package_name: string;
  imageurl: string;
  duration_id: number;
  actual_price: string;
  offer_price: string;
  destinationroute_id: number;
  staycategories_id: number;
  rating: number;
  duration_tags: string;
}

interface Location {
  location_id: number;
  location_name: string;
  packages: Package[];
}

const DestinationPackage: React.FC<{ location: Location }> = ({ location }) => {
  return (
    <div className="mx-auto my-6 px-2 max-w-screen-xl">
      <div className="flex justify-between items-center mb-4 px-2">
        <h2 className="text-xl font-semibold">{location.location_name}</h2>
        {/* <div className="flex items-center justify-center text-sm font-bold">
          <span>View All</span>
        </div> */}
      </div>

      {/* Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-2">
        {location.packages.map((pkg) => (
          <div
            key={pkg.package_id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <Link
              href={{
                pathname: `/packages/${pkg.package_id}`,
                query: {
                  location_id: location.location_id,
                  duration_id: pkg.duration_id,
                  staycategory_id: pkg.staycategories_id,
                  destination_routeid: pkg.destinationroute_id,
                },
              }}
              target="_blank"
            >
              <div className="w-full h-56 relative overflow-hidden rounded-t-lg">
                <Image
                  src={`http://103.168.18.92${pkg.imageurl}`}
                  alt={pkg.package_name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <div className="px-4 py-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Duration: {pkg.duration_tags}</span>
                  <span>Rating: {pkg.rating}</span>
                </div>
                <h3 className="mt-2 text-lg font-semibold">{pkg.package_name}</h3>
                <div className="flex flex-col items-end mt-2">
                  <span className="text-sm line-through text-gray-500">
                    INR {pkg.actual_price}
                  </span>
                  <span className="text-xl font-bold text-green-600">
                    INR {pkg.offer_price}/
                    <span className="text-xs text-gray-500 ml-1">Adult</span>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationPackage;
