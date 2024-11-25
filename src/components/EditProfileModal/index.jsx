import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Formik } from "formik";
import { DropdownMenuItem, DropdownMenu } from "../ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { SquarePen } from "lucide-react";
import InputMask from "react-input-mask";
import { editProfileSchema } from "./validateSchema";

import { useUserSession } from "../../hooks/user-service";
import { useAutenticate } from "../../hooks/auth.js";
import { useState } from "react";

export const EditProfileModal = ({ caption, title, childTitle }) => {
  const [profiledUpdated, setProfiledUpdated] = useState(false);
  const { updateProfile } = useUserSession();
  const { setUser, user } = useAutenticate();
  const { toast } = useToast();

  return (
    <Dialog
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setTimeout(() => setProfiledUpdated(false), 400);
        }
      }}
      className="rounded"
    >
      <DropdownMenu>
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <DialogTrigger asChild>
            <button className="flex flex-row items-center gap-2">
              <SquarePen />
              {childTitle}
            </button>
          </DialogTrigger>
        </DropdownMenuItem>
      </DropdownMenu>
      {profiledUpdated ? (
        <DialogContent className="sm:max-w-[425px] px-4" autoFocus={false}>
          <DialogHeader className="flex items-center justify-center px-10 py-10">
            <DialogTitle>Seu perfil foi atualizado!</DialogTitle>
            <DialogDescription>Clique no X acima</DialogDescription>
          </DialogHeader>
        </DialogContent>
      ) : (
        <DialogContent className="sm:max-w-[425px]" autoFocus={false}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{caption}</DialogDescription>
          </DialogHeader>
          <Formik
            initialValues={{
              username: "",
              phonenumber: "",
              password: "",
              bio: "",
            }}
            validationSchema={editProfileSchema}
            validateOnChange={false}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              try {
                setSubmitting(true);

                updateProfile(
                  values.username,
                  values.phonenumber,
                  values.password,
                  values.bio,
                  setUser
                ).then(({ success, message }) => {
                  if (success) {
                    setProfiledUpdated(true);
                    resetForm();
                  } else {
                    return toast({
                      title: "Ops! Algo de errado aconteceu",
                      description: message,
                    });
                  }
                });
              } catch (err) {
                console.log(err);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
            }) => (
              <form
                onSubmit={handleSubmit}
                id="updatingProfileForm"
                className="grid gap-4 py-4"
              >
                {/* Nome */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="name" className="text-left">
                    Nome
                  </Label>
                  <Input
                    id="name"
                    name="username"
                    type="text"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.username && touched.username && (
                    <span className="text-xs text-red-500">
                      {errors.username}
                    </span>
                  )}
                </div>

                {/* Telefone */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="phonenumber" className="text-left">
                    Telefone
                  </Label>
                  <InputMask
                    mask="(99) 99999-9999"
                    value={values.phonenumber}
                    onChange={(e) =>
                      setFieldValue("phonenumber", e.target.value)
                    }
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                  >
                    {(inputProps) => (
                      <Input
                        {...inputProps}
                        id="phonenumber"
                        name="phonenumber"
                        type="text"
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

                {/* Senha */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="password" className="text-left">
                    Senha
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password && (
                    <span className="text-xs text-red-500">
                      {errors.password}
                    </span>
                  )}
                </div>

                {/* Descrição */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="bio" className="text-left">
                    Descrição
                  </Label>
                  <Input
                    id="bio"
                    name="bio"
                    type="text"
                    value={values.bio}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.bio && touched.bio && (
                    <span className="text-xs text-red-500">{errors.bio}</span>
                  )}
                </div>

                <DialogFooter>
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    form="updatingProfileForm"
                    className="w-full"
                  >
                    Salvar alterações
                  </Button>
                </DialogFooter>
              </form>
            )}
          </Formik>
        </DialogContent>
      )}
    </Dialog>
  );
};
