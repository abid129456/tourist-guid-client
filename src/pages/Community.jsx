const Community = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-4 text-center">Traveler Stories</h2>
      <p className="text-center text-gray-600 mb-8">
        Read real stories and experiences from fellow travelers.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Placeholder for stories */}
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-700 mb-2">
            “My trip to Sajek was unforgettable! The view from the top is breathtaking.”
          </p>
          <p className="text-sm text-gray-500">- Rakib, March 2024</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-700 mb-2">
            “I loved exploring Sylhet's tea gardens. The weather was perfect.”
          </p>
          <p className="text-sm text-gray-500">- Farzana, April 2024</p>
        </div>
      </div>
    </div>
  );
};
export default Community;