import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

const ManageGuides = () => {
  const [refresh, setRefresh] = useState(false);

  const { data: guides = [], isLoading } = useQuery({
    queryKey: ["tour-guides", refresh],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/tour-guides");
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/tour-guides/${id}`);
        toast.success("Guide deleted!");
        setRefresh(!refresh);
      } catch (error) {
        toast.error("Failed to delete guide!");
      }
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Tour Guides</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th>Name</th>
              <th>Email</th>
              <th>Location</th>
              <th>Phone</th>
              <th>Available</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {guides.map((guide) => (
              <tr key={guide._id}>
                <td>{guide.name}</td>
                <td>{guide.email}</td>
                <td>{guide.location}</td>
                <td>{guide.phone}</td>
                <td>{guide.available ? "Yes" : "No"}</td>
                <td>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded mr-2"
                    onClick={() => handleDelete(guide._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageGuides;
