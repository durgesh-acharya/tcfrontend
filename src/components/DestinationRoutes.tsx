import { useState } from 'react';

interface Route {
  id: number;
  route: string;
}

interface DestinationRoutesProps {
  routes: Route[];
  onSelectionChange: (id: number | null) => void;
}

const DestinationRoutes: React.FC<DestinationRoutesProps> = ({ routes, onSelectionChange }) => {
  const [selectedRoute, setSelectedRoute] = useState<number | null>(
    routes.length > 0 ? routes[0].id : null // Set default to first route's id
  );

  const handleSelectRoute = (id: number) => {
    const newSelectedId = id === selectedRoute ? null : id;
    setSelectedRoute(newSelectedId);
    onSelectionChange(newSelectedId);
  };

  return (
    // <div style={styles.container}>
    //   <h2>Destination Routes</h2>
    //   <ul style={styles.list}>
    //     {routes.map((destination) => (
    //       <li
    //         key={destination.id}
    //         style={{
    //           ...styles.listItem,
    //           backgroundColor: selectedRoute === destination.id ? 'yellow' : '#f1f1f1',
    //           color: 'black',
    //         }}
    //         onClick={() => handleSelectRoute(destination.id)}
    //       >
    //         {destination.id}. {destination.route}
    //       </li>
    //     ))}
    //   </ul>
    // </div>
    <>
    <h6 className="m-2 pb-2 font-semibold text-md">Destination Routes</h6>
    
      {
        routes.map((destination) => (
          <div className={`flex items-center space-x-2 border p-4 m-2 rounded-lg shadow-md cursor-pointer transition-all ${
            selectedRoute === destination.id ? 'bg-black text-white shadow-3xl transform scale-105' : 'bg-white text-black'
           }`}
          key={destination.id}   
          onClick={() => handleSelectRoute(destination.id)}
        >
          <h2 className="text-md font-semibold">{destination.route}</h2>
        </div>
        ))
      }
     
     
 
    </>
    
    
  
  );
};

const styles = {
  container: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '80%',
    margin: '0 auto',
  },
  list: {
    listStyleType: 'none',
    padding: '0',
  },
  listItem: {
    padding: '10px 20px',
    marginBottom: '10px',
    cursor: 'pointer',
    borderRadius: '8px',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
};

export default DestinationRoutes;
