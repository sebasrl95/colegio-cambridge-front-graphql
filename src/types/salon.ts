export interface Salon {
  _id: string;
  codigo: string;
  area: string;
}

export interface CreateSalonInput {
  codigo: string;
  area: string;
}

export interface UpdateSalonInput {
  codigo?: string;
  area?: string;
}