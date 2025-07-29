// // src/pages/dashboard/guide/Schedule.jsx
// import { useState, useEffect } from "react";

// const GuideSchedule = () => {
//   const [assignedTours, setAssignedTours] = useState([]);

//   useEffect(() => {
//     // ডামি ডাটা, পরে API থেকে আসবে
//     const dummyTours = [
//       {
//         id: 1,
//         packageName: "Cox's Bazar Trip",
//         touristName: "Alex",
//         tourDate: "2024-12-10",
//         price: 15000,
//         status: "In Review",
//       },
//       {
//         id: 2,
//         packageName: "Sundarbans Adventure",
//         touristName: "Maria",
//         tourDate: "2024-11-20",
//         price: 18000,
//         status: "Pending",
//       },
//     ];
//     setAssignedTours(dummyTours);
//   }, []);

//   const handleAccept = (id) => {
//     setAssignedTours((prev) =>
//       prev.map((tour) =>
//         tour.id === id ? { ...tour, status: "Accepted" } : tour
//       )
//     );
//   };

//   const handleReject = (id) => {
//     // Rejected status update
//     setAssignedTours((prev) =>
//       prev.map((tour) =>
//         tour.id === id ? { ...tour, status: "Rejected" } : tour
//       )
//     );
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">My Assigned Tours</h2>
//       {assignedTours.length === 0 ? (
//         <p>No assigned tours found.</p>
//       ) : (
//         <table className="min-w-full border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border px-4 py-2">Package</th>
//               <th className="border px-4 py-2">Tourist</th>
//               <th className="border px-4 py-2">Date</th>
//               <th className="border px-4 py-2">Price</th>
//               <th className="border px-4 py-2">Status</th>
//               <th className="border px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {assignedTours.map((tour) => (
//               <tr key={tour.id}>
//                 <td className="border px-4 py-2">{tour.packageName}</td>
//                 <td className="border px-4 py-2">{tour.touristName}</td>
//                 <td className="border px-4 py-2">{tour.tourDate}</td>
//                 <td className="border px-4 py-2">{tour.price}</td>
//                 <td className="border px-4 py-2">{tour.status}</td>
//                 <td className="border px-4 py-2 space-x-2">
//                   <button
//                     disabled={tour.status !== "In Review"}
//                     onClick={() => handleAccept(tour.id)}
//                     className={`px-3 py-1 rounded ${
//                       tour.status === "In Review"
//                         ? "bg-green-600 text-white"
//                         : "bg-gray-400 cursor-not-allowed"
//                     }`}
//                   >
//                     Accept
//                   </button>
//                   <button
//                     onClick={() => handleReject(tour.id)}
//                     className="px-3 py-1 rounded bg-red-600 text-white"
//                   >
//                     Reject
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default GuideSchedule;


// src/pages/dashboard/guide/Schedule.jsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

const fetchAssignedTours = async () => {
  const res = await axios.get("http://localhost:5000/assigned-tours");
  return res.data;
};

const GuideSchedule = () => {
  const queryClient = useQueryClient();

  const {
    data: assignedTours = [],
    isLoading,
    isError,
    error,
  } = useQuery(["assignedTours"], fetchAssignedTours);

  const updateStatusMutation = useMutation(
    ({ id, status }) =>
      axios.patch(`http://localhost:5000/assigned-tours/${id}`, { status }),
    {
      onSuccess: () => {
        Swal.fire("Success", "Tour status updated", "success");
        queryClient.invalidateQueries(["assignedTours"]);
      },
      onError: () => {
        Swal.fire("Error", "Failed to update status", "error");
      },
    }
  );

  const handleStatusChange = (id, status) => {
    Swal.fire({
      title: `Are you sure you want to ${status.toLowerCase()} this tour?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${status}`,
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatusMutation.mutate({ id, status });
      }
    });
  };

  if (isLoading) return <p className="text-center mt-10">Loading assigned tours...</p>;

  if (isError)
    return (
      <p className="text-center mt-10 text-red-600">
        Error: {error.message || "Failed to load assigned tours"}
      </p>
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Assigned Tours</h2>
      {assignedTours.length === 0 ? (
        <p>No assigned tours found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Package</th>
                <th className="border px-4 py-2">Tourist</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignedTours.map((tour) => (
                <tr key={tour._id || tour.id}>
                  <td className="border px-4 py-2">{tour.packageName}</td>
                  <td className="border px-4 py-2">{tour.touristName}</td>
                  <td className="border px-4 py-2">{tour.tourDate}</td>
                  <td className="border px-4 py-2">{tour.price}</td>
                  <td className="border px-4 py-2">{tour.status}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      disabled={
                        tour.status !== "In Review" || updateStatusMutation.isLoading
                      }
                      onClick={() => handleStatusChange(tour._id || tour.id, "Accepted")}
                      className={`px-3 py-1 rounded ${
                        tour.status === "In Review"
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Accept
                    </button>
                    <button
                      disabled={updateStatusMutation.isLoading}
                      onClick={() => handleStatusChange(tour._id || tour.id, "Rejected")}
                      className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GuideSchedule;
