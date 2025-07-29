// import { useForm } from "react-hook-form";
// import { useContext } from "react";
// import { AuthContext } from "../contexts/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";

// const Register = () => {
//   const { register: createUser, updateUser } = useContext(AuthContext);
//   const { register, handleSubmit } = useForm();
//   const navigate = useNavigate();

//   const onSubmit = async (data) => {
//     try {
//       await createUser(data.email, data.password);
//       await updateUser({
//         displayName: data.name,
//         photoURL: data.image,
//       });
//       toast.success("Registration Successful!");
//       navigate("/");
//     } catch (err) {
//       toast.error("Registration failed");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto my-10 p-6 border shadow rounded">
//       <h2 className="text-2xl font-bold mb-4">Register</h2>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <input
//           type="text"
//           placeholder="Full Name"
//           {...register("name", { required: true })}
//           className="w-full border px-3 py-2"
//         />
//         <input
//           type="text"
//           placeholder="Photo URL"
//           {...register("image", { required: true })}
//           className="w-full border px-3 py-2"
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           {...register("email", { required: true })}
//           className="w-full border px-3 py-2"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           {...register("password", { required: true, minLength: 6 })}
//           className="w-full border px-3 py-2"
//         />
//         <button
//           type="submit"
//           className="w-full bg-green-600 text-white py-2 rounded"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Register;


import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getAuth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase.config";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    image: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic password strength validation (min 6 char)
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);

      // Update displayName and photoURL
      await updateProfile(userCredential.user, {
        displayName: form.name,
        photoURL: form.image || "https://i.ibb.co/7QpKsCX/user.png",
      });

      toast.success("Registration Successful!");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const handleGoogleRegister = async () => {
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
      <form onSubmit={handleRegister} className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-700">Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border rounded"
        />

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
          placeholder="Password (min 6 characters)"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border rounded"
        />

        <input
          type="text"
          name="image"
          placeholder="Profile Image URL (optional)"
          value={form.image}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition mb-4"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <button
          type="button"
          onClick={handleGoogleRegister}
          disabled={loading}
          className="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600 transition"
        >
          {loading ? "Please wait..." : "Register with Google"}
        </button>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
