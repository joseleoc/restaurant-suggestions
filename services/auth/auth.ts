import { db } from '@/firebase';
import { User as FirebaseUser } from 'firebase/auth';

import { User } from '@/types/auth.types';

import { setDoc, doc, getDoc } from 'firebase/firestore';

export const createUser = async (params: { user: FirebaseUser }) => {
    return new Promise((resolve, reject) => {
        const { user } = params;
        const newUser = new User({ email: user.email || '', id: user.uid });

      setDoc(doc(db, 'users', user.uid));

      setDoc(doc(db, 'users', user.uid), { ...newUser })
          .then(() => {
              resolve(newUser);
          })
          .catch((error) => reject(error));
  });
};

export const getUser = async (params: { userId: string }) => {
    return new Promise((resolve, reject) => {
        const { userId } = params;
        const userRef = doc(db, 'users', userId);
        getDoc(userRef)
            .then((doc) => {
          if (!doc.exists()) {
              reject(new Error('No existe el usuario'));
          } else {
              if (doc.data() == undefined) {
                  reject(new Error('Error al encontrar al usuario'));
              } else if (doc.data()?.is_deleted) {
                  reject(new Error('El usuario ha sido eliminado'));
                  return;
              } else if (doc.data()?.is_active === false) {
                  reject(new Error('El usuario no está activo'));
                  return;
              } else {
                  resolve(new User(doc.data() as User));
              }
          }
      })
          .catch((error) => reject(error));
  });
};