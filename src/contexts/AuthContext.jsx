import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // ✅ role state
  const [loading, setLoading] = useState(true);

  // Create account
  const register = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Login
  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Update user profile
  const updateUser = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  // Logout
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Forgot password
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        // Get JWT token
        axios
          .post("http://localhost:5000/jwt", { email: currentUser.email })
          .then((res) => {
            localStorage.setItem("access-token", res.data.token);
          });

        // ✅ Get user role
        try {
          const res = await axios.get(
            `http://localhost:5000/users/${currentUser.email}`
          );
          setRole(res.data.role);
        } catch (err) {
          console.error("Error fetching role:", err);
          setRole(null);
        }
      } else {
        localStorage.removeItem("access-token");
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    role, // ✅ export role
    register,
    login,
    loginWithGoogle,
    updateUser,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
