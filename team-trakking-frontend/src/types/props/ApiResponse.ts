export interface ApiResponse<T = any> {
  data: T; // Data can be either a single object or an array of objects
  error: string;
  statusCode: number;
}
