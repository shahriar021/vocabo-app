import { authInstance } from "../../firebaseConfig";

export const signUpUser = async (email: string, password: string) => {
  try {
    // Native SDK calls the method on the auth instance
    const userCredential = await authInstance.createUserWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await authInstance.signInWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const logoutUser = async () => {
  try {
    await authInstance.signOut();
  } catch (error: any) {
    throw new Error(error.message);
  }
};
