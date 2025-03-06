import * as admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import {
  FIREBASE_ADMIN_SDK_CERT,
  FIREBASE_STORAGE_BUCKET,
} from '@/helpers/environment';

if (!FIREBASE_ADMIN_SDK_CERT) {
  throw new Error('Please define `FIREBASE_ADMIN_SDK_CERT` in .env');
}
if (!FIREBASE_STORAGE_BUCKET) {
  throw new Error('Please define `FIREBASE_STORAGE_BUCKET` in .env');
}

const serviceAccountCert = JSON.parse(FIREBASE_ADMIN_SDK_CERT);

const getApp = () => {
  if (admin.apps.length > 0 && admin.apps[0] !== null) {
    return admin.apps[0];
  }
  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccountCert),
    storageBucket: FIREBASE_STORAGE_BUCKET!,
  });
};

const app = getApp();

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
