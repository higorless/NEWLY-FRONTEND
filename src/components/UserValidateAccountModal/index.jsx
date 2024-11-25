import { Icons } from "../Icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Formik } from "formik";
import { validateAccountSchema } from "./validateSchema.js";
import { useAutenticate } from "../../hooks/useAutenticate.js";
import InputMask from "react-input-mask";

export const UserValidateAccountModal = ({ ...props }) => {
  const { userAutentication } = useAutenticate();

  return (
    <div className="grid gap-6" {...props}>
      <Formik
        initialValues={{
          phonenumber: "",
          password: "",
        }}
        validationSchema={validateAccountSchema}
        validateOnBlur={false} // Desativa validação ao desfocar
        validateOnChange={false} // Desativa validação ao alterar os campos
        validateOnMount={false} // Desativa validação inicial
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            userAutentication(values.phonenumber, values.password);
            setSubmitting(false);
          }, 1000);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="phonenumber" className="text-left mb-2">
                Número de Telefone
              </Label>
              <InputMask
                mask="(99) 99999-9999"
                value={values.phonenumber}
                onChange={(e) => setFieldValue("phonenumber", e.target.value)}
                onBlur={handleBlur}
                disabled={isSubmitting}
              >
                {(inputProps) => (
                  <Input
                    {...inputProps}
                    id="phonenumber"
                    name="phonenumber"
                    placeholder="(00) 00000-0000"
                  />
                )}
              </InputMask>
              {errors.phonenumber && touched.phonenumber && (
                <span className="text-xs self-start text-red-500">
                  {errors.phonenumber}
                </span>
              )}
            </div>

            {/* Senha */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="password" className="text-left mb-2">
                Sua Senha
              </Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Digite sua senha"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
              />
              {errors.password && touched.password && (
                <span className="text-xs text-red-500 self-start">
                  {errors.password}
                </span>
              )}
            </div>
            <Button disabled={isSubmitting} type="submit" className="w-full">
              {isSubmitting && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Faça seu Login
            </Button>
          </form>
        )}
      </Formik>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
      </div>
    </div>
  );
};
