// import { useForm } from "react-hook-form";
// import { useContext } from "react";
// import { AuthContext } from "../contexts/AuthContext";
// import { useNavigate, useLocation, Link } from "react-router-dom";
// import { toast } from "react-hot-toast";

// const Login = () => {
//   const { login, loginWithGoogle } = useContext(AuthContext);
//   const { register, handleSubmit } = useForm();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from?.pathname || "/";

//   const onSubmit = async (data) => {
//     try {
//       await login(data.email, data.password);
//       toast.success("Login Successful!");
//       navigate(from, { replace: true });
//     } catch (err) {
//       toast.error("Login failed");
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       await loginWithGoogle();
//       toast.success("Google Login Successful!");
//       navigate(from, { replace: true });
//     } catch (err) {
//       toast.error("Google Login failed");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto my-10 p-6 border shadow rounded">
//       <h2 className="text-2xl font-bold mb-4">Login</h2>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <input
//           type="email"
//           placeholder="Email"
//           {...register("email", { required: true })}
//           className="w-full border px-3 py-2"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           {...register("password", { required: true })}
//           className="w-full border px-3 py-2"
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 rounded"
//         >
//           Login
//         </button>
//       </form>

//       <p className="text-sm mt-3">
//         Don’t have an account? <Link to="/register" className="text-blue-600 underline">Register</Link>
//       </p>

//       <div className="mt-4">
//         <button
//           onClick={handleGoogleLogin}
//           className="w-full bg-red-500 text-white py-2 rounded"
//         >
//           Login with Google
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;


import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast"; // তোমার যদি নাই তাহলে npm install react-hot-toast
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config"; // তোমার ফায়ারবেস কনফিগ ফাইল

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      toast.success("Login Successful!");
      navigate("/"); // login success → homepage
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Google Login Successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <form onSubmit={handleEmailLogin} className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-700">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition mb-4"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600 transition"
        >
          {loading ? "Please wait..." : "Login with Google"}
        </button>

        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-green-600 underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
