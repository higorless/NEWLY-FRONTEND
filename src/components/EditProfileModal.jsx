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
import { DropdownMenuItem, DropdownMenu } from "./ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { SquarePen } from "lucide-react";

import { useUserSession } from "../hooks/user-service";
import { useAutenticate } from "../hooks/auth.js";
import { useState } from "react";

export const EditProfileModal = ({ caption, title, childTitle }) => {
  const [profiledUpdated, setProfiledUpdated] = useState(false);
  const { updateProfile } = useUserSession();
  const { setUser, user } = useAutenticate();
  const { toast } = useToast();

  return (
    <>
      <Dialog
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setTimeout(() => setProfiledUpdated(false), 400);
          }
        }}
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
              <DialogTitle>Seu perfil foi atalizado!</DialogTitle>
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
                avatar: "",
              }}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                try {
                  setSubmitting(true);

                  updateProfile(
                    values.username,
                    values.phonenumber,
                    values.password,
                    values.bio,
                    values.avatar,
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
                  setSubmitting(true);
                }
              }}
            >
              {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form
                  onSubmit={handleSubmit}
                  id="updatingProfileForm"
                  className="grid gap-4 py-4"
                >
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Nome
                    </Label>
                    <Input
                      id="name"
                      name="username"
                      type="string"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Telefone
                    </Label>
                    <Input
                      id="phonenumber"
                      name="phonenumber"
                      type="string"
                      value={values.phonenumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Senha
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Descrição
                    </Label>
                    <Input
                      id="bio"
                      name="bio"
                      type="string"
                      value={values.bio}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Foto Perfil
                    </Label>
                    <Input
                      id="avatar"
                      name="avatar"
                      type="string"
                      value={values.avatar}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="col-span-3"
                    />
                  </div>
                  <DialogFooter>
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      form="updatingProfileForm"
                    >
                      salvar alterações
                    </Button>
                  </DialogFooter>
                </form>
              )}
            </Formik>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};
