import { auth, db } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { User } from "@/src/types/auth.types";

import { setDoc, doc, getDoc } from "firebase/firestore";

export const createUser = async (params: {
  email: string;
  password: string;
}): Promise<User> => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = params;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const newUser = new User({
          email: user.email || "",
          id: user.uid,
        });

        return Promise.all([
          newUser,
          setDoc(doc(db, "users", user.uid), { ...newUser }),
        ]);
      })
      .then(([newUser]) => {
        resolve(newUser);
      })
      .catch((error) => {
        console.error(
          "🚀 ~ file: auth.ts:33 ~ returnnewPromise ~ error:",
          error,
        );
        reject(error);
      });
  });
};

export const getUser = async (params: { userId: string }) => {
  return new Promise((resolve, reject) => {
    const { userId } = params;
    const userRef = doc(db, "users", userId);
    getDoc(userRef)
      .then((doc) => {
        if (!doc.exists()) {
          reject(new Error("No existe el usuario"));
        } else {
          if (doc.data() == undefined) {
            reject(new Error("Error al encontrar al usuario"));
          } else if (doc.data()?.is_deleted) {
            reject(new Error("El usuario ha sido eliminado"));
            return;
          } else if (doc.data()?.is_active === false) {
            reject(new Error("El usuario no está activo"));
            return;
          } else {
            resolve(new User(doc.data() as User));
          }
        }
      })
      .catch((error) => reject(error));
  });
};

export const signIn = async (params: {
  email: string;
  password: string;
}): Promise<User> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { email, password } = params;
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      try {
        const user = (
          await getDoc(doc(db, "users", userCredential.user.uid))
        ).data() as User | undefined;
        if (user == undefined) {
          reject(new Error("No existe el usuario"));
        } else if (user?.is_deleted) {
          reject(new Error("El usuario ha sido eliminado"));
          return;
        } else if (user?.is_active === false) {
          reject(new Error("El usuario no está activo"));
          return;
        } else {
          resolve(new User(user));
        }
      } catch (error) {
        console.error(
          "🚀 ~ file: auth.ts:91 ~ returnnewPromise ~ error:",
          error,
        );
        reject(error);
        return;
      }
    } catch (error) {
      console.error(
        "🚀 ~ file: auth.ts:104 ~ returnnewPromise ~ error:",
        error,
      );
      reject(error);
      return;
    }
  });
};
