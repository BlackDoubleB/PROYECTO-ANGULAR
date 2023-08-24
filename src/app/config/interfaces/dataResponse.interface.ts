export interface DataResponse<T> {
  value: T;
  values: T[];
  message: string;
  success: boolean;
}
