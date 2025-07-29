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
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const register = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };


  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };


  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };


  const updateUser = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };


  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };


  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {

        axios
          .post("http://localhost:5000/jwt", { email: currentUser.email })
          .then((res) => {
            localStorage.setItem("access-token", res.data.token);
          });


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
    role,
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
