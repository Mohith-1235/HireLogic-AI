
'use client';

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { initializeFirebase } from '.';

export async function uploadProfileImage(userId: string, file: File): Promise<string> {
  const { firebaseApp } = initializeFirebase();
  const storage = getStorage(firebaseApp);
  
  const filePath = `profile-images/${userId}/${file.name}`;
  const storageRef = ref(storage, filePath);

  try {
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading profile image:', error);
    throw new Error('Failed to upload profile image.');
  }
}
