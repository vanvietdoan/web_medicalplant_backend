import { User } from "../entities/User";
import { Report } from "../entities/Report";

export interface IUserReport {
  user_report_id: number;
  user_id: number;
  report_id: number;
  user: User;
  report: Report;
}

export interface IUserReportResponse {
  user_report_id: number;
  user_id: number;
  report_id: number;
  created_at: Date;
  updated_at: Date;
}