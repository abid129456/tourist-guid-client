// // src/pages/dashboard/admin/Users.jsx
// import { useState, useEffect } from "react";

// const AdminUsers = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     // ডামি ডাটা, পরে API থেকে আসবে
//     const dummyUsers = [
//       { id: 1, name: "Alex", email: "alex@example.com", role: "Tourist" },
//       { id: 2, name: "Maria", email: "maria@example.com", role: "Tour Guide" },
//       { id: 3, name: "John", email: "john@example.com", role: "Tourist" },
//     ];
//     setUsers(dummyUsers);
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">Manage Users</h2>
//       {users.length === 0 ? (
//         <p>No users found.</p>
//       ) : (
//         <table className="min-w-full border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border px-4 py-2">Name</th>
//               <th className="border px-4 py-2">Email</th>
//               <th className="border px-4 py-2">Role</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user.id}>
//                 <td className="border px-4 py-2">{user.name}</td>
//                 <td className="border px-4 py-2">{user.email}</td>
//                 <td className="border px-4 py-2">{user.role}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default AdminUsers;


import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUsers = async () => {
  const res = await axios.get("http://localhost:5000/users");
  return res.data;
};

const AdminUsers = () => {
  const { data: users = [], isLoading, isError } = useQuery(["users"], fetchUsers);

  if (isLoading) return <p className="text-center mt-10">Loading users...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">Error loading users.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border px-4 py-2">{user.name || "N/A"}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUsers;
