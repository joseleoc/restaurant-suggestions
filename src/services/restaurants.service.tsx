import {
  collection,
  query,
  where,
  getDocs,
  limit,
  startAt,
  orderBy,
} from "firebase/firestore";

import {
  Restaurant,
  Plate,
  RestaurantFromFirestore,
} from "../types/general.types";
import { db } from "@/firebase";
import { CollectionNames } from "../constants/collections-names";
import { firebaseConverter } from "../utils/firestore-converter";

export function fetchRecommendedRestaurants(params: {
  allergies: string[];
  page_size: number;
  page: number;
}): Promise<Restaurant[]> {
  return new Promise((resolve, reject) => {
    const { allergies, page_size, page } = params;
    const platesQuery = query(
      collection(db, CollectionNames.Plates),
      where("is_active", "==", true),
      where("is_deleted", "==", false),
      where("allergies", "not-in", allergies),
    );

    getDocs(platesQuery)
      .then((platesSnapshot) => {
        const restaurantIds = platesSnapshot.docs.map(
          (doc) => firebaseConverter<Plate>().fromFirestore(doc).restaurant,
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
      });
  });
}
