import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Tus credenciales reales
const firebaseConfig = {
  apiKey: "AIzaSyCGCOvF3CT1a-YwQXUWWMR45i-z57Xfooo",
    authDomain: "telegallery-c280a.firebaseapp.com",
      projectId: "telegallery-c280a",
        storageBucket: "telegallery-c280a.firebasestorage.app",
          messagingSenderId: "782669473275",
            appId: "1:782669473275:web:8674bcb78ffcc35fbcd75e",
              measurementId: "G-DDB3SGN57W"
              };

              // Inicializamos la conexión
              const app = initializeApp(firebaseConfig);

              // Exportamos la base de datos
              export const db = getFirestore(app);
              