import { Genus } from "../entities/Genus";

export interface ISpecies {
  species_id: number;
  name: string;
  genus_id: number;
  genus: Genus;
  created_at: Date;
  updated_at: Date;
}