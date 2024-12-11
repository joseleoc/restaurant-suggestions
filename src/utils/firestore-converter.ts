import { QueryDocumentSnapshot } from "firebase/firestore";


export const firebaseConverter = <T>() => ({
    toFirestore(data: Partial<T>) {
        return data;
    },
    fromFirestore(snapshot: QueryDocumentSnapshot): T {
        return snapshot.data() as T;
    },
});
