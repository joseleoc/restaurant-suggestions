import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";
import { Plate } from "../types/general.types";
import { db } from "@/firebase";
import { CollectionNames } from "../constants/collections-names";
import { firebaseConverter } from "../utils/firestore-converter";
import { Linking } from "react-native";

export function fetchRecommendedPlates({
  queryKey,
}: {
  queryKey: [
    string,
    { allergiesToInclude: string[]; page_size: number; page: number },
  ];
}): Promise<Plate[]> {
  return new Promise((resolve, reject) => {
    const [_, params] = queryKey;

    const constraints = [
      where("is_active", "==", true),
      where("is_deleted", "==", false),
    ];
    if (params.allergiesToInclude.length > 0) {
      constraints.push(
        where("allergies", "array-contains-any", params.allergiesToInclude),
      );
    }
    const q = query(collection(db, CollectionNames.Plates), ...constraints);

    getDocs(q)
      .then((snapshot) => {
        const plates = snapshot.docs.map((doc) => {
          return firebaseConverter<Plate>().fromFirestore(doc);
        });
        resolve(plates);
        return plates;
      })
      .catch((error) => {
        console.error(
          "🚀 ~ file: plates.service.ts:24 ~ returnnewPromise ~ error:",
          error,
        );
        reject(error);
        throw new Error(error);
      });
  });
}

export async function placeOrder(params: {
  phoneNumber: string;
  message: string;
}) {
  const { phoneNumber, message } = params;
  const encodedMessage = encodeURIComponent(message);
  const num = "+584129251454";
  const link = `https://wa.me/${num}?text=${encodedMessage}`;

  try {
    return await Linking.openURL(link);
  } catch (error) {
    console.error("🚀 ~ file: plates.service.tsx:67 ~ error:", error);
    return Promise.reject(error);
  }
}

export function fetchPlateById(id: string): Promise<Plate> {
  return new Promise((resolve, reject) => {
    console.log("fetch plate");
    const q = query(
      collection(db, CollectionNames.Plates),
      where("id", "==", id),
    );

    getDocs(q)
      .then((snapshot) => {
        const plate = firebaseConverter<Plate>().fromFirestore(
          snapshot.docs[0],
        );
        resolve(plate);
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