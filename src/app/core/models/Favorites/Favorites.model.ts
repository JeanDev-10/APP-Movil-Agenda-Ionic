export interface FavoriteGetI {
  message:    string;
  statusCode: number;
  error:      boolean;
  data:       Data;
}

export interface Data {
  data:  Datum[];
  meta:  Meta;
  links: Links;
}

export interface Datum {
  id:      string;
  contact: Contact;
}

export interface Contact {
  id:       string;
  name:     string;
  phone:    string;
  nickname: string;
}

export interface Links {
  first: string;
  last:  string;
  prev:  string;
  next:  string;
}

export interface Meta {
  current_page: number;
  from:         number;
  last_page:    number;
  path:         string;
  per_page:     number;
  to:           number;
  total:        number;
}
