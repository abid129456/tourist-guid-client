import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const fetchRandomTourGuides = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/tour-guides/random?limit=6`
  );
  return data;
};

const TourGuidesSection = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery(["randomTourGuides"], fetchRandomTourGuides);

  if (isLoading) return <p>Loading tour guides...</p>;
  if (error) return <p>Error loading tour guides</p>;

  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
      {data.map((guide) => (
        <div key={guide._id} className="border rounded shadow p-4 text-center">
          <img
            src={guide.photoURL || "https://via.placeholder.com/150"}
            alt={guide.name}
            className="mx-auto rounded-full h-24 w-24 object-cover"
          />
          <h4 className="font-semibold mt-2">{guide.name}</h4>
          <p className="text-sm text-gray-600">{guide.experience} years experience</p>
          <button
            onClick={() => navigate(`/tour-guides/${guide._id}`)}
            className="mt-3 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
          >
            Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default TourGuidesSection;
