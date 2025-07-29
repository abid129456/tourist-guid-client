// import React from "react";
// import { useQuery } from "@tanstack/react-query";

// // ✅ Replace this with your real API call
// const fetchPackages = async () => {
//   const response = await fetch("https://api.example.com/packages"); // <-- your API here
//   if (!response.ok) {
//     throw new Error("Failed to fetch packages");
//   }
//   return response.json();
// };

// const PackagesSection = () => {
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["packages"],
//     queryFn: fetchPackages,
//   });

//   if (isLoading) {
//     return <div className="text-center py-8">Loading packages...</div>;
//   }

//   if (error) {
//     return (
//       <div className="text-center text-red-500 py-8">
//         Error loading packages: {error.message}
//       </div>
//     );
//   }

//   return (
//     <div className="grid md:grid-cols-3 gap-6">
//       {data.map((pkg) => (
//         <div
//           key={pkg.id}
//           className="bg-white rounded shadow p-4 border border-gray-100"
//         >
//           <h3 className="text-xl font-semibold mb-2">{pkg.title}</h3>
//           <p className="text-gray-600 mb-2">{pkg.description}</p>
//           <p className="text-green-600 font-bold">৳ {pkg.price}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PackagesSection;


import React from "react";
import { useQuery } from "@tanstack/react-query";

const fetchPackages = async () => {
  const res = await fetch("http://localhost:5000/packages"); // ✅ Replace with your real backend
  if (!res.ok) {
    throw new Error("Failed to fetch packages");
  }
  return res.json();
};

const PackagesSection = () => {
  const { data: packages = [], isLoading, error } = useQuery({
    queryKey: ["packages"],
    queryFn: fetchPackages,
  });

  if (isLoading) {
    return <div className="text-center py-8">Loading packages...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        Error loading packages: {error.message}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {packages.map((pkg) => (
        <div
          key={pkg._id}
          className="bg-white rounded-lg shadow p-4 border border-gray-100 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-xl font-semibold mb-2">{pkg.title}</h3>
            <p className="text-gray-600 mb-2">{pkg.description}</p>
            <p className="text-green-600 font-bold mb-3">৳ {pkg.price}</p>
          </div>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            onClick={() => {
              // optionally set state or redirect to booking
              alert(`Book Now for ${pkg.title}`);
            }}
          >
            Book Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default PackagesSection;
