import { useEffect, useState } from "react";
import { onAuthStateChanged, loginWithEmail, registerWithEmail, logout } from "../services/auth/firebaseAuth";

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return {
    user,
    loading,
    login: loginWithEmail,
    register: registerWithEmail,
    logout,
  };
};
