import { User } from "../entities/User";
import { Plant } from "../entities/Plant";

export interface IReport {
  report_id: number;
  title: string;
  content: string;
  status: string;
  user_id: number;
  plant_id: number;
  created_at: Date;
  updated_at: Date;
  user: User;
  plant: Plant;
} 