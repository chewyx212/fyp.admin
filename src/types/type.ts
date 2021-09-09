export interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface UserInfoType {
  name: string;
  email: string;
  organizations: any[];
  ownOrganizations: any[];
}

export interface CreateOrganizationForm {
  name: string;
  address: string;
}