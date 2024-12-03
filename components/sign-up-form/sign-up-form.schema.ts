import * as yup from 'yup';

export const signUpSchema = yup.object({
    email: yup.string().email('Email inválido').required('Email es requerido'),
    password: yup.string().required('Contraseña es requerida'),
    confirmPassword: yup
        .string()
        .required('Confirmar contraseña es requerido')
        .oneOf([yup.ref('password')], 'Las contraseñas no coinciden'),
});
