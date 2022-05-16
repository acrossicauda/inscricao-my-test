import * as yup from 'yup';

export const FormValidations = yup.object().shape({
    name: yup
        .string()
        .required("Nome é obrigatório"),
    email: yup
        .string()
        .email("E-mail é inválido")
        .required("E-mail é obrigatório"),
    password: yup
        .string()
        .min(6, "Minímo 8 caracteres")
        .max(20, "Máximo 20 caracteres")
        .required('Senha é obrigatório'),
})