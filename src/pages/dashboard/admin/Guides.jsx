import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

const fetchGuides = async () => {
  const res = await axios.get("http://localhost:5000/tour-guides");
  return res.data;
};

const AdminGuides = () => {
  const queryClient = useQueryClient();

  // Get guides list
  const { data: guides = [], isLoading, isError } = useQuery(["tour-guides"], fetchGuides);

  // Delete mutation
  const deleteMutation = useMutation(
    (id) => axios.delete(`http://localhost:5000/tour-guides/${id}`),
    {
      onSuccess: () => {
        toast.success("Guide deleted successfully");
        queryClient.invalidateQueries(["tour-guides"]);
      },
      onError: () => toast.error("Failed to delete guide"),
    }
  );

  // Approve mutation
  const approveMutation = useMutation(
    (id) => axios.patch(`http://localhost:5000/guides/approve/${id}`),
    {
      onSuccess: () => {
        toast.success("Guide approved");
        queryClient.invalidateQueries(["tour-guides"]);
      },
      onError: () => toast.error("Failed to approve guide"),
    }
  );

  if (isLoading) return <p>Loading guides...</p>;
  if (isError) return <p>Error loading guides</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Tour Guides</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {guides.map((guide) => (
            <tr key={guide._id}>
              <td className="border border-gray-300 p-2">{guide.name}</td>
              <td className="border border-gray-300 p-2">{guide.email}</td>
              <td className="border border-gray-300 p-2">
                {guide.status || "pending"}
              </td>
              <td className="border border-gray-300 p-2 space-x-2">
                {guide.status !== "approved" && (
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => approveMutation.mutate(guide._id)}
                    disabled={approveMutation.isLoading}
                  >
                    Approve
                  </button>
                )}
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded"
                  onClick={() => {
                    if (window.confirm("Are you sure to delete this guide?")) {
                      deleteMutation.mutate(guide._id);
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
    </div>
  );
};

export default AdminGuides;

