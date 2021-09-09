
import { CreateOrganizationForm } from "../types/type";
import axios from "../utils/axios/AxiosHandler";

export const organizationApi = {
  getOrganization: async () => {
    return axios.get(`organization`);
  },
  createOrganization: async (payload:CreateOrganizationForm) => {
    return axios.post(`organization`, payload);
  },
  getOrganizationDetail: async (organizationId: string) => {
    return axios.post(`organization/detail`, { organizationId });
  },
};
