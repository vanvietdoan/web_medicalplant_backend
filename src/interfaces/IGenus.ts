import { Family } from "../entities/Family";

export interface IGenus {
  genus_id: number;
  name: string;
  family_id: number;
  created_at: Date;
  updated_at: Date;
  family: Family;
} 