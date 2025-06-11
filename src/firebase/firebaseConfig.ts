import { initializeApp } from 'firebase/app';
import { type Auth, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDvlhClts0PbM8_tjRC2_oPfhQbMz3Nu-U",
  authDomain: "first-project-78262.firebaseapp.com",
  projectId: "first-project-78262",
  storageBucket: "first-project-78262.firebasestorage.app",
  messagingSenderId: "774708766640",
  appId: "1:774708766640:web:5ec32fbf4b984f77c7d875"
};

const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };