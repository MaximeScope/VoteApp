// populate_passwords.js
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

initializeApp({ credential: applicationDefault() });
const db = getFirestore();

// generate 100 8-char alphanumeric passwords
const passwords = Array.from({length:100}, () =>
  Math.random().toString(36).slice(2,10)
);

(async () => {
  for (let pwd of passwords) {
    await db.collection('passwords').doc(pwd).set({ createdAt: Date.now() });
    console.log('Created password:', pwd);
  }
  console.log('All done!');
})();
