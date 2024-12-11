import * as yup from "yup";

const phoneRegExp =
    /^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;

export const CompleteProfileSchema = yup.object({
    name: yup.string().required("Nombre es requerido"),
    lastName: yup.string().required("Apellido es requerido"),
    phone: yup
        .string()
        .matches(phoneRegExp, "Número de teléfono no es válido")
        .required("Telefono es requerido"),
    allergies: yup.array().of(yup.string().required("Allergia es requerida")),
});
