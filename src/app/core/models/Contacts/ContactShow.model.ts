export interface ContactShowI {
  message:    string;
  statusCode: number;
  error:      boolean;
  data:       Data;
}




export interface Data {
  id:        string;
  name:      string;
  phone:     string;
  nickname:  string;
  favoritos: Favoritos|null;
}

export interface Favoritos {
  id:         number;
  user_id:    number;
  contact_id: number;
}
