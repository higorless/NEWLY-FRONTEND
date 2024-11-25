import { Icons } from "../Icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Formik } from "formik";
import { createAccountSchema } from "./validateSchema.js";
import { useAutenticate } from "../../hooks/auth.js";
import InputMask from "react-input-mask";
import { useState } from "react";

export const UserCreateAccountModal = ({
  getUserRegistrationStatus,
  ...props
}) => {
  const { userCreateAccount } = useAutenticate();
  const [accountCreated, setAccountCreated] = useState(false);

  const handleUserRegistrationStatus = (status) => {
    setAccountCreated(status);
    getUserRegistrationStatus(status);
  };

  return (
    <div
      className={`grid gap-6 ${
        accountCreated ? "min-h-[200px]" : "min-h-[400px]"
      }`}
      {...props}
    >
      {!accountCreated ? (
        <Formik
          initialValues={{
            username: "",
            phonenumber: "",
            password: "",
            bio: "",
          }}
          validationSchema={createAccountSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              setSubmitting(true);

              await userCreateAccount(
                values.phonenumber,
                values.password,
                values.username,
                values.bio
              );

              handleUserRegistrationStatus(true);
              resetForm();
            } catch (err) {
              console.error("Erro ao criar conta:", err);
            } finally {
              setSubmitting(false);
            }
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
            <form onSubmit={handleSubmit} className="grid gap-3">
              <div className="grid gap-1">
                <Label htmlFor="username" className="text-left mb-1">
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
                {errors.username && touched.username && (
                  <span className="text-xs text-red-500">
                    {errors.username}
                  </span>
                )}
              </div>
              <div className="grid gap-1">
                <Label htmlFor="phonenumber" className="text-left mb-1">
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
                {errors.phonenumber && touched.phonenumber && (
                  <span className="text-xs text-red-500">
                    {errors.phonenumber}
                  </span>
                )}
              </div>
              <div className="grid gap-1">
                <Label htmlFor="password" className="text-left mb-1">
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
                {errors.password && touched.password && (
                  <span className="text-xs text-red-500">
                    {errors.password}
                  </span>
                )}
              </div>
              <div className="grid gap-1">
                <Label htmlFor="bio" className="text-left mb-1">
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
                {errors.bio && touched.bio && (
                  <span className="text-xs text-red-500">{errors.bio}</span>
                )}
              </div>
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Registre-se com o número
              </Button>
            </form>
          )}
        </Formik>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold">Conta criada com sucesso!</h2>
          <p className="text-sm text-muted-foreground">
            Agora você pode acessar o aplicativo.
          </p>
        </div>
      )}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
      </div>
    </div>
  );
};
