import { collection, getDocs, query, where } from "firebase/firestore";
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
        where(
          "allergies",
          "array-contains-any",
          params.allergiesToInclude.splice(0, 10),
        ),
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
  const encondedMessage = encodeURIComponent(message);
  const num = phoneNumber.startsWith("0")
    ? `+58${phoneNumber.slice(1)}`
    : phoneNumber;
  const link = `https://api.whatsapp.com/send/?phone=%${num}&text=${encondedMessage}&type=phone_number&app_absent=0`;
  const canOpen = await Linking.canOpenURL(link);

  if (canOpen) {
    await Linking.openURL(link);
  } else {
    console.log("cannot open url");
    throw new Error("Cannot open url");
  }
}
