export interface LoginI {
  message:    string;
  statusCode: number;
  error:      boolean;
  data:       string;
}
export interface RegisterI {
  message:    string;
  statusCode: number;
  error:      boolean;
  data:       any[];
}
export interface LogoutI {
  message:    string;
  statusCode: number;
  error:      boolean;
  data:       any[];
}

export interface ProfileI {
  message:    string;
  statusCode: number;
  error:      boolean;
  data:       Data;
}

export interface Data {
  id:        number;
  firstname: string;
  lastname:  string;
  email:     string;
}
