import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../auth/firebase";

// El componente AuthContext proporciona el estado de autenticación y funciones para manejar el registro, inicio y cierre de sesión de usuarios.
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Mantener sesión al recargar
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  // Registrar usuario
  const register = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        setUser(userCredential.user);
        return userCredential.user;
      }
    );

  // Iniciar sesión
  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      setUser(userCredential.user);
      return userCredential.user;
    });

  // Cerrar sesión
  const logout = () => signOut(auth).then(() => setUser(null));

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
