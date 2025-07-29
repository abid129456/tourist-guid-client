// // src/pages/dashboard/admin/Packages.jsx
// import { useState, useEffect } from "react";

// const AdminPackages = () => {
//   const [packages, setPackages] = useState([]);

//   useEffect(() => {
//     // ডামি ডাটা, পরে API থেকে আসবে
//     const dummyPackages = [
//       { id: 1, title: "Cox's Bazar Trip", price: 5000, status: "Active" },
//       { id: 2, title: "Sundarbans Safari", price: 7000, status: "Upcoming" },
//     ];
//     setPackages(dummyPackages);
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">Manage Packages</h2>
//       {packages.length === 0 ? (
//         <p>No packages found.</p>
//       ) : (
//         <table className="min-w-full border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border px-4 py-2">Title</th>
//               <th className="border px-4 py-2">Price</th>
//               <th className="border px-4 py-2">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {packages.map((pkg) => (
//               <tr key={pkg.id}>
//                 <td className="border px-4 py-2">{pkg.title}</td>
//                 <td className="border px-4 py-2">{pkg.price} BDT</td>
//                 <td className="border px-4 py-2">{pkg.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default AdminPackages;


import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

const fetchPackages = async () => {
  const res = await axios.get("http://localhost:5000/packages");
  return res.data;
};

const AdminPackages = () => {
  const queryClient = useQueryClient();
  const { data: packages = [], isLoading, isError } = useQuery(
    ["packages"],
    fetchPackages
  );

  // Delete mutation
  const deleteMutation = useMutation(
    (id) => axios.delete(`http://localhost:5000/packages/${id}`),
    {
      onSuccess: () => {
        toast.success("Package deleted successfully");
        queryClient.invalidateQueries(["packages"]);
      },
      onError: () => toast.error("Failed to delete package"),
    }
  );

  // Placeholder for adding or editing a package - you'd implement these mutations similarly
  // const addMutation = useMutation(...)
  // const editMutation = useMutation(...)

  if (isLoading) return <p>Loading packages...</p>;
  if (isError) return <p>Error loading packages.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Packages</h2>

      {packages.length === 0 ? (
        <p>No packages found.</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg) => (
              <tr key={pkg._id}>
                <td className="border px-4 py-2">{pkg.title}</td>
                <td className="border px-4 py-2">{pkg.price} BDT</td>
                <td className="border px-4 py-2">{pkg.status}</td>
                <td className="border px-4 py-2 space-x-2">
                  {/* Edit button */}
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    // onClick={() => handleEdit(pkg._id)}
                    disabled
                  >
                    Edit
                  </button>
                  {/* Delete button */}
                  <button
                    className="bg-red-600 text-white px-2 py-1 rounded"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this package?"
                        )
                      ) {
                        deleteMutation.mutate(pkg._id);
                      }
                    }}
                    disabled={deleteMutation.isLoading}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPackages;
