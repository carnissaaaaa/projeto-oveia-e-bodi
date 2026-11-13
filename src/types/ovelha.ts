export type Sexo = "F" | "M";

export interface Ovelha {
  id: string;
  brinco: string;
  nome: string;
  raca: string;
  sexo: Sexo;
  idade: string;
  pesoKg: number;
}

export const RACAS_POPULARES = [
  "Santa Inês",
  "Dorper",
  "Lacaune",
  "Texel",
  "Morada Nova",
  "East Friesian",
  "Suffolk",
  "Mestiça",
] as const;
