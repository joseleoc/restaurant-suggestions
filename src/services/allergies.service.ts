import { collection, query, where, getDocs } from "firebase/firestore";

import { db } from "@/firebase";
import { Allergy } from "../types/general.types";
import { firebaseConverter } from "@/utils/firestore-converter";
import { CollectionNames } from "../constants/collections-names";

export function fetchAllergies(): Promise<Allergy[]> {
    return new Promise((resolve, reject) => {
        const q = query(
            collection(db, CollectionNames.Allergies),
            where("is_active", "==", true),
            where("is_deleted", "==", false),
        );

        getDocs(q)
            .then((snapShot) => {
                const allergies = snapShot.docs.map((doc) =>
                    firebaseConverter<Allergy>().fromFirestore(doc),
                );
                resolve(allergies);
            })
            .catch((error) => {
                console.error(
                    "🚀 ~ file: allergies.service.ts:24 ~ returnnewPromise ~ error:",
                    error,
                );
                reject(error);
            });
    });
}