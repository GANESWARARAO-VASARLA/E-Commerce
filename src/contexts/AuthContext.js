import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBqwni225mrHoMpqa1gI-n_upA9YOR6p78",
  authDomain: "e-commerce-app-9183e.firebaseapp.com",
  projectId: "e-commerce-app-9183e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading,setLoading] = useState(false)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const loginWithEmail = (email, password) => {
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        setError(null);
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          setError("Incorrect password. Please try again.");
        } else if (error.code === "auth/user-not-found") {
          setError("No user found with this email. Please sign up.");
        } else {
          setError("An error occurred. Please try again.");
        }
      }).finally(()=>setLoading(false))
  };

 
  const registerWithEmail = (name, email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        setError(null);
        updateProfile(user, { displayName: name }).catch((error) => {
          setError(error.message);
        });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => setUser(result.user))
      .catch((error) => setError(error.message));
  };

  const logout = () => {
    signOut(auth)
      .then(() => setUser(null))
      .catch((error) => setError(error.message));
  };

  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, loginWithEmail, registerWithEmail, logout,isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
