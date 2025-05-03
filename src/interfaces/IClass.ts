import { Division } from "../entities/Division";
import { Order } from "../entities/Order";

export interface IClass {
  class_id: number;
  name: string;
  division_id: number;
  created_at: Date;
  updated_at: Date;
  division: Division;
  orders?: Order[];
}

export interface IClassResponse {
  created_at: Date;
  updated_at: Date;
  class_id: number;
  name: string;
  division_id: number;
  } 