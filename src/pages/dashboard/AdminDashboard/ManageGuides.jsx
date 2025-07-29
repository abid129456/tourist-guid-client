import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

const ManageGuides = () => {
  const { data: guides = [], refetch, isLoading } = useQuery({
    queryKey: ["guides"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/guides");
      return res.data;
    },
  });

  const handleApprove = async (id) => {
    try {
      const res = await axios.patch(`http://localhost:5000/guides/approve/${id}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Guide Approved!", "success");
        refetch();
      }
    } catch (err) {
      Swal.fire("Error", "Approval failed", "error");
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  const pendingGuides = guides.filter((guide) => guide.status !== "approved");

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Pending Tour Guides</h2>
      {pendingGuides.length === 0 ? (
        <p>No pending guides found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingGuides.map((guide) => (
                <tr key={guide._id}>
                  <td className="p-2 border">{guide.name}</td>
                  <td className="p-2 border">{guide.email}</td>
                  <td className="p-2 border">{guide.phone}</td>
                  <td className="p-2 border">{guide.status}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleApprove(guide._id)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Approve
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

export default ManageGuides;
