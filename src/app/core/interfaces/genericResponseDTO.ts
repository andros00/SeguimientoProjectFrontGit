export interface GenericResponse<T> {
  code: string;
  message: string;
  data: T;
}
