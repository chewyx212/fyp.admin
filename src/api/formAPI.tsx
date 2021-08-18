
import { FormInputType } from "../types/formType";
import axios from "../utils/axios/AxiosHandler";
import { Crypto } from "../utils/crypto/Crypto";

export const formAPI = {
  postRegisterForm: async (payload: FormInputType) => {
    return axios.post(`/api/potential-customers/store`, {
      form_data: Crypto.encryption(payload),
    });
  },
};
