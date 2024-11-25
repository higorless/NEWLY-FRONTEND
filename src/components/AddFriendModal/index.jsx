import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Formik } from "formik";
import { useToast } from "@/hooks/use-toast";
import InputMask from "react-input-mask";
import { addFriendSchema } from "./validateSchema"; // Importar o esquema de validação
import { useUserSession } from "../../hooks/useUserSession";
import { useListenFriendAdded } from "../../hooks/useListenFriendAdded";

export const AddFriendModal = ({
  caption,
  title,
  handleUserDialog,
  isDialogOpen,
}) => {
  const { addFriend } = useUserSession();
  const { toast } = useToast();
  useListenFriendAdded();

  return (
    <Formik
      initialValues={{
        phonenumber: "",
      }}
      validationSchema={addFriendSchema}
      validateOnBlur={false}
      validateOnChange={false}
      validateOnMount={false}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          setSubmitting(true);

          const { success, message } = await addFriend(values.phonenumber);

          if (!success) {
            toast({
              title: "Erro",
              description: message,
            });
            return;
          }

          toast({
            title: "Parabéns",
            description: message,
          });

          resetForm();
          handleUserDialog(false);
        } catch (err) {
          console.error("Erro ao adicionar amigo:", err);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleSubmit,
        setFieldValue,
        resetForm,
        isSubmitting,
      }) => (
        <Dialog
          open={isDialogOpen}
          onOpenChange={(isOpen) => {
            if (!isOpen) {
              resetForm();
            }
            handleUserDialog(isOpen);
          }}
          className="rounded"
        >
          <DialogContent className="sm:max-w-[425px]" autoFocus={false}>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{caption}</DialogDescription>
            </DialogHeader>
            <form
              onSubmit={handleSubmit}
              id="addFriendForm"
              className="grid gap-4 py-4"
            >
              <div className="flex flex-col gap-1">
                <Label htmlFor="phonenumber" className="text-left mb-2">
                  Telefone
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
              <DialogFooter>
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  form="addFriendForm"
                  className="w-full my-2"
                >
                  {isSubmitting ? "Adicionando..." : "Adicionar Amigo"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </Formik>
  );
};
