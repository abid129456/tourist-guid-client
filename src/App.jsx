// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import MainLayout from "./layouts/MainLayout";
// import DashboardLayout from "./layouts/DashboardLayout";

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* Public Routes */}
//         <Route element={<MainLayout />}>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           {/* আরো পেজ আসবে পরে */}
//         </Route>

//         {/* Dashboard Layout (Protected later) */}
//         <Route path="/dashboard/*" element={<DashboardLayout />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";
import "./index.css";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
