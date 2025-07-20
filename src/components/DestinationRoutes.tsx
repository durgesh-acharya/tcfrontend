import { useState, useEffect } from 'react';

interface Route {
  id: number;
  route: string;
}

interface DestinationRoutesProps {
  routes: Route[];
  onSelectionChange: (id: number | null) => void;
  selectedId?: number | null; // <-- New prop
}

const DestinationRoutes: React.FC<DestinationRoutesProps> = ({ routes, onSelectionChange, selectedId }) => {
  const [selectedRoute, setSelectedRoute] = useState<number | null>(
    selectedId ?? (routes.length > 0 ? routes[0].id : null)
  );

  useEffect(() => {
    if (selectedRoute !== null) {
      onSelectionChange(selectedRoute);
    }
  }, [selectedRoute]);

  useEffect(() => {
    if (selectedId !== undefined && selectedId !== selectedRoute) {
      setSelectedRoute(selectedId);
    }
  }, [selectedId]);

  const handleSelectRoute = (id: number) => {
    const newSelectedId = id === selectedRoute ? null : id;
    setSelectedRoute(newSelectedId);
    onSelectionChange(newSelectedId);
  };

  return (
    <>
      <h6 className="m-2 pb-2 font-semibold text-md">Destination Routes</h6>
      {routes.map((destination) => (
        <div
          className={`flex items-center space-x-2 border p-4 m-2 rounded-lg shadow-md cursor-pointer transition-all ${
            selectedRoute === destination.id
              ? 'bg-black text-white shadow-3xl transform scale-105'
              : 'bg-white text-black'
          }`}
          key={destination.id}
          onClick={() => handleSelectRoute(destination.id)}
        >
          <h2 className="text-md font-semibold">{destination.route}</h2>
        </div>
      ))}
    </>
  );
};

export default DestinationRoutes;
