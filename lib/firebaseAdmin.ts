import * as admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

const serviceAccountStr = process.env.FIREBASE_ADMIN_SDK_CERT;
const firebaseBucket = process.env.FIREBASE_STORAGE_BUCKET;

if (!serviceAccountStr) {
  throw new Error('Please define `FIREBASE_ADMIN_SDK_CERT` in .env');
}
if (!firebaseBucket) {
  throw new Error('Please define `FIREBASE_STORAGE_BUCKET` in .env');
}

const serviceAccountCert = JSON.parse(serviceAccountStr);

const getApp = () => {
  if (admin.apps.length > 0 && admin.apps[0] !== null) {
    return admin.apps[0];
  }
  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccountCert),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET!,
  });
};

const app = getApp();

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
