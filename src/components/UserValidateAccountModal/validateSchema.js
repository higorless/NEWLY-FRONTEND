import * as yup from "yup";

export const validateAccountSchema = yup.object().shape({
  phonenumber: yup.number().required("Digite seu número de telefone"),
  password: yup.string().required("Digite sua senha"),
});
