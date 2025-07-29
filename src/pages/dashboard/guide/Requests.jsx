import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

const fetchGuideRequests = async () => {
  const res = await axios.get("http://localhost:5000/guide-requests");
  return res.data;
};

const GuideRequests = () => {
  const queryClient = useQueryClient();

  const {
    data: requests = [],
    isLoading,
    isError,
    error,
  } = useQuery(["guideRequests"], fetchGuideRequests);

  const updateStatusMutation = useMutation(
    ({ id, status }) => axios.patch(`http://localhost:5000/guide-requests/${id}`, { status }),
    {
      onSuccess: () => {
        Swal.fire("Success", "Request status updated", "success");
        queryClient.invalidateQueries(["guideRequests"]);
      },
      onError: () => {
        Swal.fire("Error", "Failed to update status", "error");
      },
    }
  );

  const handleStatusChange = (id, status) => {
    Swal.fire({
      title: `Are you sure to ${status.toLowerCase()} this request?`,
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

  if (isLoading) return <p className="text-center mt-10">Loading requests...</p>;

  if (isError)
    return (
      <p className="text-center mt-10 text-red-600">
        Error: {error.message || "Failed to load requests"}
      </p>
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Tour Guide Requests</h2>
      {requests.length === 0 ? (
        <p>No requests found.</p>
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
              {requests.map((req) => (
                <tr key={req._id || req.id}>
                  <td className="border px-4 py-2">{req.packageName}</td>
                  <td className="border px-4 py-2">{req.touristName}</td>
                  <td className="border px-4 py-2">{req.tourDate}</td>
                  <td className="border px-4 py-2">{req.price}</td>
                  <td className="border px-4 py-2">{req.status}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      disabled={req.status !== "In Review" || updateStatusMutation.isLoading}
                      onClick={() => handleStatusChange(req._id || req.id, "Accepted")}
                      className={`px-3 py-1 rounded ${
                        req.status === "In Review"
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Accept
                    </button>
                    <button
                      disabled={updateStatusMutation.isLoading}
                      onClick={() => handleStatusChange(req._id || req.id, "Rejected")}
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

export default GuideRequests;
