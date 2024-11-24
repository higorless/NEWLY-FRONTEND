import * as yup from "yup";

export const addFriendSchema = yup.object().shape({
  phonenumber: yup
    .string()
    .matches(/^\(\d{2}\) \d{5}-\d{4}$/, "Formato de telefone inválido")
    .required("Digite um número de telefone"),
});
