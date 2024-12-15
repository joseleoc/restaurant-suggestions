import {
  collection,
  query,
  where,
  getDocs,
  limit,
  startAt,
  orderBy,
  Timestamp,
} from "firebase/firestore";

import {
  Plate,
  Restaurant,
  RestaurantFromFirestore,
  Restaurant_Plates,
} from "../types/general.types";
import { db } from "@/firebase";
import { CollectionNames } from "../constants/collections-names";
import { firebaseConverter } from "../utils/firestore-converter";

export function fetchRecommendedRestaurants({
  queryKey,
}: {
  queryKey: [
    string,
    {
      allergiesToInclude: string[];
      page_size: number;
      page: number;
    },
  ];
}): Promise<Restaurant[]> {
  return new Promise((resolve, reject) => {
    const { allergiesToInclude, page_size, page } = queryKey[1];
    const constraints = [];
    if (allergiesToInclude.length > 0) {
      constraints.push(
        where(
          "allergies",
          "array-contains-any",
          allergiesToInclude.splice(0, 10),
        ),
      );
    }
    const ternaryQuery = query(
      collection(db, CollectionNames.Restaurants_Plates),
      ...constraints,
    );
    getDocs(ternaryQuery)
      .then((ternarySnapshot) => {
        const restaurantIds = ternarySnapshot.docs.map(
          (doc) =>
            firebaseConverter<Restaurant_Plates>().fromFirestore(doc)
              .restaurant,
        );
        const restaurantsQuery = query(
          collection(db, CollectionNames.Restaurants),
          where("is_active", "==", true),
          where("is_deleted", "==", false),
          where("id", "in", restaurantIds),
          orderBy("name"),
          limit(page_size),
          startAt(page * page_size),
        );

        return getDocs(restaurantsQuery);
      })
      .then((restaurantsSnapshot) => {
        const restaurants = restaurantsSnapshot.docs.map(
          (doc) =>
            new Restaurant(
              firebaseConverter<RestaurantFromFirestore>().fromFirestore(doc),
            ),
        );
        resolve(restaurants);
        return restaurants;
      })
      .catch((error) => {
        console.error(
          "🚀 ~ file: restaurants.service.ts:24 ~ returnnewPromise ~ error:",
          error,
        );
        reject(error);
        throw new Error(error);
      });
  });
}

export function fetchRestaurantPlates(params: {
  restaurantId: string;
  page: number;
  page_size: number;
}): Promise<Plate[]> {
  return new Promise((resolve, reject) => {
    const { restaurantId, page, page_size } = params;
    const q = query(
      collection(db, CollectionNames.Restaurants_Plates),
      where("restaurant", "==", restaurantId),
      orderBy("plate"),
      limit(page_size),
      startAt(page * page_size),
    );

    getDocs(q)
      .then((snapshot) => {
        const ternary = snapshot.docs.map((doc) => {
          return firebaseConverter<Restaurant_Plates>().fromFirestore(doc);
        });

        const platesQuery = query(
          collection(db, CollectionNames.Plates),
          where("is_active", "==", true),
          where("is_deleted", "==", false),
          where(
            "id",
            "in",
            ternary.map((p) => p.plate),
          ),
        );

        return getDocs(platesQuery);
      })
      .then((platesSnapshot) => {
        const plates = platesSnapshot.docs.map((doc) => {
          return firebaseConverter<
            Plate & { created_at: Timestamp; updated_at: Timestamp }
          >().fromFirestore(doc);
        });
        resolve(plates.map((p) => new Plate(p)));
      })
      .catch((error) => {
        console.error(
          "🚀 ~ file: restaurants.service.ts:24 ~ returnnewPromise ~ error:",
          error,
        );
        reject(error);
        throw new Error(error);
      });
  });
}
