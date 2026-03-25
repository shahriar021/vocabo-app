import { useState } from "react";
import { signUpUser, loginUser, logoutUser } from "src/services/auth/firebaseAuth";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    try {
      const user = await signUpUser(email, password);
      return user;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const user = await loginUser(email, password);
      return user;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await logoutUser();
  };

  return { signUp, login, logout, loading };
};
