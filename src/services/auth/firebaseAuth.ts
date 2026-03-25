
import auth from "@react-native-firebase/auth";

export const loginWithEmail = (email: string, password: string) => auth().signInWithEmailAndPassword(email, password);

export const registerWithEmail = (email: string, password: string) => auth().createUserWithEmailAndPassword(email, password);

export const logout = () => auth().signOut();

export const onAuthStateChanged = (callback: (user: any) => void) => auth().onAuthStateChanged(callback);
