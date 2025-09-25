'use client';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  UserCredential,
} from 'firebase/auth';
import { initializeFirebase } from '.';
import { updateUserDocument } from './firestore';

// --- Social Sign-Ins (Popup based) ---
async function socialSignIn(provider: GoogleAuthProvider | OAuthProvider): Promise<UserCredential> {
  const { auth } = initializeFirebase();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // After sign-in, ensure user document exists in Firestore
    const { firestore } = initializeFirebase();
    const userData = {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    };
    // This is a non-blocking update.
    updateUserDocument(firestore, user.uid, userData);

    return result;
  } catch (error) {
    console.error(`Error signing in with ${provider.providerId}`, error);
    throw error;
  }
}

export function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  return socialSignIn(provider);
}

export function signInWithApple() {
  const provider = new OAuthProvider('apple.com');
  return socialSignIn(provider);
}


// --- Email/Password Sign-Up ---
export async function signUpWithEmail(name: string, email: string, password: string) {
    const { auth, firestore } = initializeFirebase();
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update Firebase Auth profile
        await updateProfile(user, { displayName: name });

        // Create user document in Firestore
        const userData = {
            name: name,
            email: user.email,
            photoURL: user.photoURL,
        };
        // This is a non-blocking update
        updateUserDocument(firestore, user.uid, userData);
        
        return userCredential;

    } catch (error) {
        console.error('Error signing up with email', error);
        throw error;
    }
}


// --- Sign Out ---
export async function signOutUser() {
  const { auth } = initializeFirebase();
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out', error);
    throw error;
  }
}
