import { Icons } from "../Icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Formik } from "formik";
import { createAccountSchema } from "./validateSchema.js";
import { useAutenticate } from "../../hooks/auth.js";
import InputMask from "react-input-mask";

export const UserCreateAccountModal = ({
  getUserRegistrationStatus,
  ...props
}) => {
  const { userCreateAccount } = useAutenticate();

  const handleUserRegistrationStatus = (status) => {
    getUserRegistrationStatus(status);
  };

  return (
    <div className="grid gap-6" {...props}>
      <Formik
        initialValues={{
          username: "",
          phonenumber: "",
          password: "",
          bio: "",
        }}
        validationSchema={createAccountSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            userCreateAccount(
              values.phonenumber,
              values.password,
              values.username,
              values.bio
            );
            handleUserRegistrationStatus(true);
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
          <form onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="username">
                  Seu nome
                </Label>
                <Input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="Seu nome"
                  onChange={handleChange}
                  value={values.username}
                  onBlur={handleBlur}
                  autoCapitalize="none"
                  disabled={isSubmitting}
                />
                <span className="text-xs text-muted-foreground">
                  {errors.username && touched.username && errors.username}
                </span>
              </div>
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="phonenumber">
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
                      type="text"
                      name="phonenumber"
                      placeholder="(00) 00000-0000"
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
              <div className="grid gap-1">
                <Label htmlFor="bio" className="text-sm">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  name="bio"
                  placeholder="Fale sobre você..."
                  value={values.bio}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                />
                <span className="text-xs text-muted-foreground">
                  {errors.bio && touched.bio && errors.bio}
                </span>
              </div>
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Registre-se com o número
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
