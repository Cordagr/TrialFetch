// auth.js
import { auth } from './firebase';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";

// Sign Up and Send Verification Email
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await sendEmailVerification(user);
    console.log('Verification email sent to:', user.email);
  } catch (error) {
    console.error('Error signing up:', error);
  }
};

// Sign In and Check Email Verification Status
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    if (user.emailVerified) {
      console.log('User signed in and email is verified:', user.email);
    } else {
      console.log('Email not verified. Please verify your email.');
    }
  } catch (error) {
    console.error('Error signing in:', error);
  }
};
