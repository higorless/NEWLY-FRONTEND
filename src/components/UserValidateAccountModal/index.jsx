import { Icons } from "../Icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Formik } from "formik";
import { validateAccountSchema } from "./validateSchema.js";
import { useAutenticate } from "../../hooks/auth.js";
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
          setFieldValue, // Adicionado aqui para corrigir o problema do InputMask
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="phonenumber">
                  Número de Telefone
                </Label>
                <InputMask
                  mask="(99) 99999-9999"
                  value={values.phonenumber}
                  onChange={(e) => setFieldValue("phonenumber", e.target.value)}
                  onBlur={(e) => handleBlur(e)}
                  disabled={isSubmitting}
                >
                  {(inputProps) => (
                    <Input
                      {...inputProps}
                      id="phonenumber"
                      name="phonenumber"
                      placeholder="(00) 00000-0000"
                      autoCapitalize="none"
                    />
                  )}
                </InputMask>
                <span className="text-xs text-muted-foreground">
                  {errors.phonenumber &&
                    touched.phonenumber &&
                    errors.phonenumber}
                </span>
              </div>

              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="password">
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
                  autoCapitalize="none"
                  disabled={isSubmitting}
                />
                <span className="text-xs text-muted-foreground">
                  {errors.password && touched.password && errors.password}
                </span>
              </div>

              <Button disabled={isSubmitting} type="submit">
                {isSubmitting && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Faça seu Login
              </Button>
            </div>
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
