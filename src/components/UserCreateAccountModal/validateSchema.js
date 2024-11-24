import * as yup from "yup";

export const createAccountSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .required("Digite seu nome completo"),
  phonenumber: yup
    .string()
    .matches(/^\(\d{2}\) \d{5}-\d{4}$/, "Formato de telefone inválido")
    .required("Digite seu número de telefone"),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("Digite sua senha"),
  bio: yup
    .string()
    .max(200, "A bio deve ter no máximo 200 caracteres")
    .required("Digite uma bio"),
});
