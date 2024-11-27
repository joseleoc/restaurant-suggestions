import { auth } from "@/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";


export const createUser = async (params: { email: string, password: string }) => {
    const { email, password } = params;
    createUserWithEmailAndPassword(auth, email, password).then((res) => {

    }).catch(error => {
        const { code, message } = error;
        console.error("🚀 ~ file: auth.ts:10 ~ createUserWithEmailAndPassword ~ error:", { code, message });
    });
}