const Trips = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-4 text-center">Explore Our Trips</h2>
      <p className="text-center text-gray-600 mb-8">
        Browse through our amazing tour packages to explore the best destinations in Bangladesh.
      </p>

      {/* ভবিষ্যতে এখানে ট্যুর প্যাকেজ লিস্ট দেখানো হবে */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* শুধু placeholder */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Cox's Bazar Beach Tour</h3>
          <p className="text-gray-600">Enjoy the longest beach in the world with luxury hotels and seafood!</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Sundarbans Adventure</h3>
          <p className="text-gray-600">Explore the world's largest mangrove forest and see Royal Bengal Tigers!</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Srimangal Tea Garden</h3>
          <p className="text-gray-600">Visit the tea capital of Bangladesh and relax in nature.</p>
        </div>
      </div>
    </div>
  );
};

export default Trips;
