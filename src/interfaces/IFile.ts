export interface IFileUploadResponse {
  url: string;
  path: string; // Relative path to store in database
  filename: string;
  mimetype: string;
  size: number;
}