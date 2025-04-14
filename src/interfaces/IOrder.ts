import { Class } from "../entities/Class";
export interface IOrder {
  order_id: number;
  name: string;
  class_id: number;
  class?: Class;
}