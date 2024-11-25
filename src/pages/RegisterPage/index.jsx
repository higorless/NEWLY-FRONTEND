import { UserCreateAccountModal } from "../../components/UserCreateAccountModal";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../../components/ui/button";
import nemlyLogo from "../../images/nemly-logo.svg";
import nemlyLogoWhite from "../../images/nemly-logo-branco.svg";

export const RegisterPage = () => {
  const [isUserRegistered, setIsUserRegistered] = useState(false);

  const handleUserRegistratiom = (state) => {
    setIsUserRegistered(state);
  };
  return (
    <>
      {isUserRegistered ? (
        <div className="container relative flex w-full h-screen flex-col max-w-none items-center justify-center md:grid md: lg:max-w-none lg:grid-cols-2 lg:px-0">
          <NavLink
            to="/"
            className="absolute right-4 top-4 md:right-8 md:top-8"
          >
            Login
          </NavLink>
          <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
            <div className="absolute inset-0 bg-zinc-900" />
            <div className="relative z-20 flex items-center text-lg font-medium">
              <div className="relative z-20 flex items-center text-lg font-medium">
                <img
                  src={nemlyLogo}
                  alt="Logotipo do aplicativo nemly"
                  className="mr-2 h-6 w-6 bg-white rounded p-1"
                />
              </div>
              Nemly
            </div>
            <div className="relative z-20 mt-auto">
              <blockquote className="space-y-2">
                <p className="text-lg">
                  &ldquo;NEMLY: o serviço web de live chat criado por Higor,
                  inspirado pela genialidade do lendário Epix Pivot Master!
                  &rdquo;
                </p>
              </blockquote>
            </div>
          </div>
          <div className="lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Conta cirada com sucesso!
                </h1>
                <p className="text-sm text-muted-foreground">
                  Clique no botão abaixo e faça seu login
                </p>
              </div>
              <div className="grid gap-4">
                <NavLink className="grid" to="/">
                  <Button>Fazer meu login</Button>
                </NavLink>
                <Button
                  onClick={() => {
                    setIsUserRegistered((prevState) => !prevState);
                  }}
                >
                  Volta a página de registro
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container relative flex w-full px-12 h-screen flex-col max-w-none items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
          <NavLink
            to="/"
            className="absolute right-4 top-4 md:right-8 md:top-8"
          >
            Login
          </NavLink>
          <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
            <div className="absolute inset-0 bg-zinc-900 overflow-auto" />
            <div className="relative z-20 flex items-center text-lg font-medium">
              <div className="relative z-20 flex items-center text-lg font-medium">
                <img
                  src={nemlyLogo}
                  alt="Logotipo do aplicativo nemly"
                  className="mr-2 h-6 w-6 bg-white rounded p-1"
                />
              </div>
              Nemly
            </div>
            <div className="relative z-20 mt-auto">
              <blockquote className="space-y-2">
                <p className="text-lg">
                  &ldquo;NEMLY: o serviço web de live chat criado por Higor,
                  inspirado pelo lendário Epix Pivot Master! &rdquo;
                </p>
              </blockquote>
            </div>
          </div>
          <div className="lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Crie sua conta
                </h1>
                <p className="text-sm text-muted-foreground">
                  Digite seu nome e seu número de telefone para criar sua conta
                </p>
              </div>
              <UserCreateAccountModal
                getUserRegistrationStatus={handleUserRegistratiom}
                className="py-4"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
