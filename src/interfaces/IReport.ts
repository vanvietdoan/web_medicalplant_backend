import { User } from "../entities/User";
import { Plant } from "../entities/Plant";

export interface IReport {
  report_id: number;
  summary: string;
  propose: string;
  proof: string;
  status: number;
  plant_id: number;
  plant?: Plant;  // Optional since we might not always load the relationship
  plant_name: string;
  plant_english_name: string;
  plant_description: string;
  plant_instructions: string;
  plant_benefits: string;
  plant_species_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface IReportResponse {
  report_id: number;
  summary: string;
  propose: string;
  proof: string;
  status: number;
  plant_id: number;
  plant_name: string;
  plant_english_name: string;
  plant_description: string;
  plant_instructions: string;
  plant_benefits: string;
  plant_species_id: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
} 