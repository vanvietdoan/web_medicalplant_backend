import { Plant } from "../entities/Plant";
import { Disease } from "../entities/Disease";

export interface IPlantDisease {
  plant_disease_id: number;
  plant_id: number;
  disease_id: number;
  symptoms: string;
  treatment: string;
  created_at: Date;
  updated_at: Date;
  plant: Plant;
  disease: Disease;
} 