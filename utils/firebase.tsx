import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { NEXT_PUBLIC_FIREBASE_CONFIG } from '@/helpers/environment';

const firebaseConfig = JSON.parse(NEXT_PUBLIC_FIREBASE_CONFIG as string);

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const auth = getAuth(app);
const db = getDatabase(app);
const storage = getStorage(app);

export { database, auth, app, db, storage };
