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

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);

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
