import { collection, getDocs, query, where } from "firebase/firestore";
import { Plate } from "../types/general.types";
import { db } from "@/firebase";
import { CollectionNames } from "../constants/collections-names";
import { firebaseConverter } from "../utils/firestore-converter";

export function fetchRecommendedPlates(params: {
  allergies: string[];
  page_size: number;
  page: number;
}): Promise<Plate[]> {
  return new Promise((resolve, reject) => {
    const q = query(
      collection(db, CollectionNames.Plates),
      where("is_active", "==", true),
      where("is_deleted", "==", false),
      where("allergies", "not-in", params.allergies),
    );

    getDocs(q)
      .then((snapshot) => {
        const plates = snapshot.docs.map((doc) => {
          return firebaseConverter<Plate>().fromFirestore(doc);
        });
        resolve(plates);
      })
      .catch((error) => {
        console.error(
          "🚀 ~ file: plates.service.ts:24 ~ returnnewPromise ~ error:",
          error,
        );
        reject(error);
      });
  });
}
