import * as yup from "yup";

export const validateAccountSchema = yup.object().shape({
  phonenumber: yup
    .string()
    .matches(/^\(\d{2}\) \d{5}-\d{4}$/, "Digite um número de telefone válido")
    .required("Digite seu número de telefone"),
  password: yup.string().required("Digite sua senha"),
});
