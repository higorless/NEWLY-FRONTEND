import { create } from "zustand";
import { api } from "../services/api.js";

export const useUserSession = create((set) => ({
  friends: [],
  getFriendlist: async () => {
    try {
      const token = localStorage.getItem("@nemly:token");

      if (!token) {
        throw new Error("Something went wrong with localstorage token");
      }

      const response = await api({
        method: "get",
        headers: {
          authorization: `baerer ${token}`,
        },
        url: "/user/friends",
      });

      set({
        friends: [...response.data],
      });

      return { success: true, message: "Todos os amigos buscados" };
    } catch (err) {
      console.log(err);
      return {
        success: false,
        message: "Erro ao tentar buscar todos os amigos",
      };
    }
  },
  updateProfile: async (
    username,
    phonenumber,
    password,
    bio,
    avatar,
    setUser
  ) => {
    try {
      const token = localStorage.getItem("@nemly:token");
      const user = JSON.parse(localStorage.getItem("@nemly:user"));

      if (!token) {
        throw new Error("Token ausente no localStorage");
      }

      if (!user) {
        throw new Error("Dados do usuário ausentes no localStorage");
      }

      const updatableFields = { username, phonenumber, password, bio, avatar };

      const updatedUser = Object.keys(updatableFields).reduce((acc, key) => {
        acc[key] =
          updatableFields[key] === "" ? user[key] : updatableFields[key];
        return acc;
      }, {});

      const finalUser = { ...user, ...updatedUser };

      const response = await api({
        method: "put",
        url: "/user/update",
        data: updatedUser,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (response) {
        delete finalUser.password;
        localStorage.setItem("@nemly:user", JSON.stringify({ finalUser }));
        setUser(finalUser);
      } else {
        throw new Error("Erro ao tentar atualizar o usuário");
      }

      return { success: true, message: "Perfil atualizado com sucesso" };
    } catch (err) {
      console.error("Erro:", err);
      return { success: false, message: "Erro ao tentar atualizar o perfil" };
    }
  },
}));
