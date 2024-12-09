import * as yup from 'yup';

export const SignInSchema = yup.object({
    email: yup.string().email('Email inválido').required('Email es requerido'),
    password: yup.string().required('Contraseña es requerida'),
});