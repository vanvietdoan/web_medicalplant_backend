import { Plant } from "../entities/Plant";
import { User } from "../entities/User";
import { Disease } from "../entities/Disease";

export interface IAdviceComment {
  advice_id: number;
  title: string;
  content: string;
  user_id: number;
  plant_id: number;
  disease_id: number;
  created_at: Date;
  updated_at: Date;
  user: User;
  plant: Plant;
  disease: Disease;
} 
