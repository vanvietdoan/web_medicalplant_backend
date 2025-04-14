import { Species } from "../entities/Species";
import { PlantDisease } from '../entities/PlantDisease';
import { Picture } from '../entities/Picture';

export interface IPlant {
  plant_id: number;
  name: string;
  english_name: string;
  description: string;
  species_id: number;
  instructions: string;
  benefits: string;
  created_at: Date;
  updated_at: Date;
  species: Species;
  // images: Picture[];
  // plant_diseases: PlantDisease[];
} 

export interface IFilterPlants {
  name?: string;
  divisionId?: number;
  classId?: number;
  orderId?: number;
  familyId?: number;
  genusId?: number;
  speciesId?: number;
}