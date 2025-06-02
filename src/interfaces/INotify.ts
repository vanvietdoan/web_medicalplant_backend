import { User } from "../entities/User";


export interface INotify {
  notify_id: number;
  user_id: number;
  title: string;
  content: string;
  is_read: boolean;
  created_at: Date;
}

export interface INotifyResponse {
  notify_id: number;
  title: string;
  content: string;
  is_read: boolean;
  created_at: Date;
} 