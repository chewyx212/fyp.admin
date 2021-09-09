import { LoginForm, RegisterForm } from "../types/type";
import axios from "../utils/axios/AxiosHandler";

export const authApi = {
  registerAdmin: async (payload: RegisterForm) => {
    return axios.post(`auth/signadminup`, payload);
  },
  login: async (payload: LoginForm) => {
    return axios.post(`auth/signin`, payload);
  },
};
