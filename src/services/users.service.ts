import { auth, db } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { User } from "@/src/types/auth.types";

import { setDoc, doc, getDoc } from "firebase/firestore";
import { CollectionNames } from "../constants/collections-names";

export async function createUser(params: {
  email: string;
  password: string;
}): Promise<User> {
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
          setDoc(doc(db, CollectionNames.Users, user.uid), { ...newUser }),
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
}

export async function getUser(params: { userId: string }): Promise<User> {
  return new Promise((resolve, reject) => {
    const { userId } = params;
    const userRef = doc(db, CollectionNames.Users, userId);
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
}

export async function signIn(params: {
  email: string;
  password: string;
}): Promise<User> {
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
          await getDoc(doc(db, CollectionNames.Users, userCredential.user.uid))
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
}

export async function signOut(): Promise<void> {
  return new Promise((resolve, reject) => {
    auth
      .signOut()
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function updateUser(params: {
  userId: string;
  data: Partial<User>;
}): Promise<void> {
  return new Promise((resolve, reject) => {
    setDoc(doc(db, CollectionNames.Users, params.userId), {
      ...params.data,
      updated_at: new Date(),
    })
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}
