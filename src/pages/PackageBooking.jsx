import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { toast } from "react-hot-toast";

const PackageBooking = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();

  const onSubmit = async (data) => {
    const bookingData = {
      ...data,
      email: user?.email,
      status: "pending",
      date: new Date(),
    };

    try {
      const res = await axios.post("http://localhost:5000/bookings", bookingData);
      if (res.data.insertedId) {
        toast.success("Booking request sent!");
        reset();
      }
    } catch (err) {
      toast.error("Booking failed!");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h2 className="text-2xl font-bold mb-4">Book Your Tour Package</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          {...register("name", { required: true })}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Package Name"
          {...register("packageName", { required: true })}
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          placeholder="Travel Date"
          {...register("travelDate", { required: true })}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Your Address"
          {...register("address", { required: true })}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Submit Booking
        </button>
      </form>
    </div>
  );
};

export default PackageBooking;
