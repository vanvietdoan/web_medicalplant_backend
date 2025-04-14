import { Plant } from "../entities/Plant";
import { Disease } from "../entities/Disease";

export interface IPicture {
  picture_id: number;
  url: string;
  description: string;
  plant_id?: number;
  disease_id?: number;
  created_at: Date;
  updated_at: Date;
} 