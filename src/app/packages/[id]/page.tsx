// app/packages/[id]/page.tsx

'use client';  // This is a Client Component

import { useParams } from 'next/navigation'; // Import `useParams` from `next/navigation`

const PackageDetail = () => {
  const params = useParams();  // Get the dynamic params from the URL
  const { id } = params;  // Extract the `id` from params

  return (
    <div>
      <h1>Package ID: {id}</h1>
    </div>
  );
};

export default PackageDetail;
