'use client';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
  signOut,
} from 'firebase/auth';
import { initializeFirebase } from '.';

export async function signInWithGoogle() {
  const { auth } = initializeFirebase();
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error('Error signing in with Google', error);
    throw error;
  }
}

export async function signInWithApple() {
  const { auth } = initializeFirebase();
  const provider = new OAuthProvider('apple.com');
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error('Error signing in with Apple', error);
    throw error;
  }
}

export async function signOutUser() {
  const { auth } = initializeFirebase();
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out', error);
    throw error;
  }
}
