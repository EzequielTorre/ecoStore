// Importaciones necesarias de Firebase:
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";

// Configuración de Firebase:
const firebaseConfig = {
  apiKey: "AIzaSyB8J3oOiyzWLSOq1BL01ABmHWXTEMlqd50",
  authDomain: "proyecto-1-8b600.firebaseapp.com",
  projectId: "proyecto-1-8b600",
  storageBucket: "proyecto-1-8b600.appspot.com", 
  messagingSenderId: "933771602307",
  appId: "1:933771602307:web:94ebf54130aa7e1e696eb6"
};

// Inicializa la aplicación de Firebase:
const app = initializeApp(firebaseConfig);

// Exporto auth y provider para usar en el contexto:
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// Función para crear un usuario con email y contraseña:
export function crearUsuario(email, password){ 
  return createUserWithEmailAndPassword(auth, email, password);
}


