import React from "react";
import { useQuery } from "@tanstack/react-query";

const fetchPackages = async () => {
  const res = await fetch("http://localhost:5000/packages");
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
