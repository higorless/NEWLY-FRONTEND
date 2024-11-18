import { NavLink } from "react-router-dom";
import { UserValidateAccountModal } from "../../components/UserValidateAccountModal";
import { useAutenticate } from "../../hooks/auth.js";
import { useEffect } from "react";

export const LoginPage = () => {
  const { user } = useAutenticate();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <a
          href="/examples/authentication"
          className="absolute right-4 top-4 md:right-8 md:top-8"
        >
          Login
        </a>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Acme Inc
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Serviço Web para live chat NEMLY. Desenvolvido e sugerido
                pelo Epix Pivot master, Youtuber lendário &rdquo;
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
              <p className="text-sm text-muted-foreground">
                Faça seu login e participe do mais novo webchat da garotada
              </p>
              <UserValidateAccountModal />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
