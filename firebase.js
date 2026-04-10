// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Credenciales proporcionadas para CloudGallery
// (Los IDs internos mantienen el nombre original del proyecto en Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyCGCOvF3CT1a-YwQXUWWMR45i-z57Xfooo",
    authDomain: "telegallery-c280a.firebaseapp.com",
      projectId: "telegallery-c280a",
        storageBucket: "telegallery-c280a.firebasestorage.app",
          messagingSenderId: "782669473275",
            appId: "1:782669473275:web:8674bcb78ffcc35fbcd75e",
              measurementId: "G-DDB3SGN57W"
              };

              // Inicializar Firebase
              const app = initializeApp(firebaseConfig);

              // Inicializar servicios que usaremos
              const auth = getAuth(app);
              const db = getFirestore(app);

              export { auth, db };