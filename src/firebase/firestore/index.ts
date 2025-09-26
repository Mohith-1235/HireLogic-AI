
'use client';

import { Firestore, doc } from 'firebase/firestore';
import { updateDocumentNonBlocking, setDocumentNonBlocking } from '../non-blocking-updates';

/**
 * Creates or merges a document for a user in the 'users' collection.
 * Uses a non-blocking 'set' with 'merge' to ensure the document is created
 * without overwriting existing fields if the document already exists.
 * @param db - The Firestore instance.
 * @param userId - The ID of the user.
 * @param data - The user data to store.
 */
export function createUserDocument(
  db: Firestore,
  userId: string,
  data: any
) {
  const docRef = doc(db, 'users', userId);
  // Use set with merge to create or update without overwriting
  setDocumentNonBlocking(docRef, data, { merge: true });
}

/**
 * Updates an existing user document in the 'users' collection.
 * This is a non-blocking operation.
 * @param db - The Firestore instance.
 * @param userId - The ID of the user.
 * @param data - The data to update.
 */
export function updateUserDocument(
  db: Firestore,
  userId: string,
  data: any
) {
  const docRef = doc(db, 'users', userId);
  updateDocumentNonBlocking(docRef, data);
}
