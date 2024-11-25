import { NavLink } from "react-router-dom";
import { UserValidateAccountModal } from "../../components/UserValidateAccountModal";
import nemlyLogo from "../../images/nemly-logo.svg";

export const LoginPage = () => {
  return (
    <>
      <div className="container relative flex w-full px-12 h-screen flex-col max-w-none items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <NavLink
          to="/register"
          className="absolute right-4 top-4 md:right-8 md:top-8"
        >
          Registrar
        </NavLink>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <img
              src={nemlyLogo}
              alt="Logotipo do aplicativo nemly"
              className="mr-2 h-6 w-6 bg-white rounded p-1"
            />
            Nemly
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;NEMLY: o serviço web de live chat criado por Higor,
                inspirado por: Epix Pivot Master e José Jhuvis! &rdquo;
              </p>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Bem vindo ao NEMLY!
              </h1>
              <p className="text-sm text-muted-foreground mb-8">
                Conecte-se agora e comece a conversar com seus amigos no nosso
                serviço de chat
              </p>
              <UserValidateAccountModal className="py-6" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
