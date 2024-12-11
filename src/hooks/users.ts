import { useStore } from "../stores/stores";
import { useMutation } from "@tanstack/react-query";
import { getUser, signOut, updateUser } from "../services/users.service";
import { User } from "../types/auth.types";
import { QueryKeys } from "../constants/query-keys";

export function useUpdateUser() {
    // --- Hooks -----------------------------------------------------------------
    const { setUser } = useStore();

    const mutation = useMutation({
        mutationKey: [QueryKeys.UpdateUser],
        mutationFn: ({ userId, data }: { userId: string; data: Partial<User> }) =>
            updateUser({ userId: userId, data })
                .then(() => {
                    return getUser({ userId });
                })
                .then((user) => {
                    setUser(user);
                }),
    });

    return mutation;
}

export function useSignOut() {
    // --- Hooks -----------------------------------------------------------------
    const { resetUser } = useStore();

    const mutation = useMutation({
        mutationKey: [QueryKeys.SignOut],
        mutationFn: () => signOut(),
        onSuccess: () => resetUser(),
    });
    // --- END: Hooks ------------------------------------------------------------

    return mutation;
}
