// // src/pages/dashboard/tourist/Stories.jsx
// import { useEffect, useState } from "react";

// const TouristStories = () => {
//   const [stories, setStories] = useState([]);

//   useEffect(() => {
//     const dummyStories = [
//       {
//         id: 1,
//         title: "My Cox's Bazar Trip",
//         content:
//           "It was a fantastic experience enjoying the beach and local food. Highly recommended!",
//         date: "2024-11-15",
//       },
//       {
//         id: 2,
//         title: "Sundarbans Adventure",
//         content:
//           "Exploring the mangrove forest was thrilling and the guide was very knowledgeable.",
//         date: "2024-10-10",
//       },
//       {
//         id: 3,
//         title: "Chittagong Hill Tracts",
//         content:
//           "The hills were breathtaking, and the local culture enriched my trip.",
//         date: "2024-09-05",
//       },
//     ];

//     setStories(dummyStories);
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Manage My Stories</h2>
//       <div className="grid gap-6 md:grid-cols-2">
//         {stories.length > 0 ? (
//           stories.map((story) => (
//             <div
//               key={story.id}
//               className="bg-white p-4 rounded shadow border border-gray-200"
//             >
//               <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
//               <p className="text-gray-700 mb-3">{story.content}</p>
//               <p className="text-sm text-gray-500">Date: {story.date}</p>
//               {/* Edit/Delete buttons later */}
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500">You have not added any stories yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TouristStories;


import { useEffect, useState } from "react";

const TouristStories = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    // Dummy stories; replace with API call in future
    const dummyStories = [
      {
        id: 1,
        title: "My Cox's Bazar Trip",
        content:
          "It was a fantastic experience enjoying the beach and local food. Highly recommended!",
        date: "2024-11-15",
      },
      {
        id: 2,
        title: "Sundarbans Adventure",
        content:
          "Exploring the mangrove forest was thrilling and the guide was very knowledgeable.",
        date: "2024-10-10",
      },
      {
        id: 3,
        title: "Chittagong Hill Tracts",
        content:
          "The hills were breathtaking, and the local culture enriched my trip.",
        date: "2024-09-05",
      },
    ];

    setStories(dummyStories);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage My Stories</h2>
      {stories.length === 0 ? (
        <p className="text-gray-500">You have not added any stories yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-white p-4 rounded shadow border border-gray-200"
            >
              <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
              <p className="text-gray-700 mb-3">{story.content}</p>
              <p className="text-sm text-gray-500">
                Date: {new Date(story.date).toLocaleDateString()}
              </p>
              {/* Edit/Delete buttons to add later */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TouristStories;
