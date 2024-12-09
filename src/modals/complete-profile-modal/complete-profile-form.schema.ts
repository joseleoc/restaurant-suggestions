import * as yup from "yup";

const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const CompleteProfileSchema = yup.object({
    name: yup.string().required("Nombre es requerido"),
    lastName: yup.string().required("Apellido es requerido"),
    phone: yup
        .string()
        .matches(phoneRegExp, "Número de teléfono no es válido")
        .required("Telefono es requerido"),
});
