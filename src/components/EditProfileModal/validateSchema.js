import * as yup from "yup";

export const editProfileSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(50, "O nome pode ter no máximo 50 caracteres"),
  phonenumber: yup
    .string()
    .matches(/^\(\d{2}\) \d{5}-\d{4}$/, "Número de telefone inválido"),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
  bio: yup
    .string()
    .max(200, "A bio pode ter no máximo 200 caracteres")
});