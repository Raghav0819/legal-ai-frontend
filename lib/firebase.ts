import { initializeApp }
from "firebase/app"

import {
  getAuth,
} from "firebase/auth"

const firebaseConfig = {

  apiKey:
    "AIzaSyBLlywBzlA7FJShHrdL3jYFCfhbFPao6Ag",

  authDomain:
    "legal-ai-1d4ae.firebaseapp.com",

  projectId:
    "legal-ai-1d4ae",

  storageBucket:
    "legal-ai-1d4ae.firebasestorage.app",

  messagingSenderId:
    "42661559345",

  appId:
    "1:42661559345:web:3a60e9b0419580afd82910",
}

const app =
  initializeApp(firebaseConfig)

export const auth =
  getAuth(app)