import * as yup from "yup";

export const createAccountSchema = yup.object().shape({
  username: yup.string().required("Digite seu nome completo"),
  phonenumber: yup.number().required("Digite seu número de telefone"),
  password: yup.string().required("Digite sua senha"),
});
