
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
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { initializeFirebase } from '.';
import { createUserDocument } from './firestore';
import { doc, getDoc } from 'firebase/firestore';

// --- Social Sign-Ins (Popup based) ---
async function socialSignIn(provider: GoogleAuthProvider | OAuthProvider): Promise<UserCredential> {
  const { auth, firestore } = initializeFirebase();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // After sign-in, check if user document exists to determine if it's a new sign-up
    const userDocRef = doc(firestore, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);

    const userData: {name: string | null; email: string | null; photoURL: string | null; verified_academics?: boolean} = {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    };

    if (!userDoc.exists()) {
      // This is a new user, set verified_academics to false
      userData.verified_academics = false;
    }

    // This will create or merge the user document.
    createUserDocument(firestore, user.uid, userData);

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
            verified_academics: false, // Set verification status to false for new users
        };
        // This will create or merge the user document.
        createUserDocument(firestore, user.uid, userData);
        
        return userCredential;

    } catch (error) {
        console.error('Error signing up with email', error);
        throw error;
    }
}

// --- Email/Password Sign-In ---
export { signInWithEmailAndPassword };


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
