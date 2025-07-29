import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";

const TouristBookings = () => {
  const { user } = useAuth();

  const { data: bookings = [], isLoading, error } = useQuery(
    ["bookings", user?.email],
    async () => {
      if (!user?.email) return [];
      const res = await axios.get(`http://localhost:5000/bookings?email=${user.email}`);
      return res.data;
    },
    {
      enabled: !!user?.email,
    }
  );

  if (isLoading) return <p className="text-center mt-10">Loading bookings...</p>;

  if (error) return <p className="text-center mt-10 text-red-500">Error loading bookings.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Package</th>
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Address</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td className="border border-gray-300 p-2">{booking.packageName}</td>
                <td className="border border-gray-300 p-2">
                  {new Date(booking.date).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 p-2">{booking.status}</td>
                <td className="border border-gray-300 p-2">{booking.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TouristBookings;
