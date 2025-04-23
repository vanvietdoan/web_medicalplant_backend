import { PlantDisease } from "../entities/PlantDisease";
import { Picture } from "../entities/Picture";
import { AdviceComment } from "../entities/AdviceComment";

export interface IDisease {
  disease_id: number;
  name: string;
  description: string;
  symptoms: string;
  created_at: Date;
  updated_at: Date;
  instructions: string;
  images: Picture[];
  plant_diseases: PlantDisease[];
} 