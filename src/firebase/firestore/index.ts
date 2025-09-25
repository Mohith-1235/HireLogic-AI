
'use client';

import { Firestore, doc } from 'firebase/firestore';
import { updateDocumentNonBlocking } from '../non-blocking-updates';

export function updateUserDocument(
  db: Firestore,
  userId: string,
  data: any
) {
  const docRef = doc(db, 'users', userId);
  updateDocumentNonBlocking(docRef, data);
}
