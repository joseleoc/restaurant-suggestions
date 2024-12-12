import { Timestamp } from "@firebase/firestore-types";

export class Allergy {
    id: string;
    name: string;
    foods: string[];
    description: string;
    type: string;
    /** Incluyente (true) o excluyente (false) */
    preference: boolean;
    is_active: boolean;
    is_deleted: boolean;

    constructor(data: Allergy) {
        this.id = data.id;
        this.name = data.name;
        this.foods = data.foods;
        this.description = data.description;
        this.type = data.type;
        this.preference = data.preference;
        this.is_active = data.is_active || true;
        this.is_deleted = data.is_deleted || false;
    }
}

export class Restaurant {
    id: string;
    address: string;
    coordinates: [number, number];
    created_at: Date;
    description: string;
    images: string[];
    is_active: boolean;
    is_deleted: boolean;
    name: string;
    plates: string[];
    schedule: string;
    updated_at: Date;

    constructor(params: RestaurantFromFirestore) {
        this.id = params.id;
        this.address = params.address;
        this.coordinates = params.coordinates;
        this.created_at = params.created_at.toDate();
        this.description = params.description;
        this.images = params.images;
        this.is_active = params.is_active || true;
        this.is_deleted = params.is_deleted || false;
        this.name = params.name;
        this.plates = params.plates;
        this.schedule = params.schedule;
        this.updated_at = params.updated_at.toDate();
    }
}

export type RestaurantFromFirestore = Restaurant & {
    created_at: Timestamp;
    updated_at: Timestamp;
};

export class Plate {
    id: string;
    allergies: string[];
    categories: string[];
    created_at: Date;
    description: string;
    images: string[];
    ingredients: string[];
    is_active: boolean;
    is_deleted: boolean;
    name: string;
    restaurant: string;
    updated_at: Date;

    constructor(
        params: Plate & { created_at: Timestamp; updated_at: Timestamp },
    ) {
        this.id = params.id;
        this.allergies = params.allergies;
        this.categories = params.categories;
        this.created_at = new FirebaseDate(params.created_at).toDate();
        this.description = params.description;
        this.images = params.images;
        this.ingredients = params.ingredients;
        this.is_active = params.is_active || true;
        this.is_deleted = params.is_deleted || false;
        this.name = params.name;
        this.restaurant = params.restaurant;
        this.updated_at = new FirebaseDate(params.updated_at).toDate();
  }
}
