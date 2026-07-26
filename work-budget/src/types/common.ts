export enum HttpStatusCode {
  Ok = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  UnprocessableEntity = 422,
  InternalServerError = 500,
}

export type ApiResponse = {
  status: string;
};
export type APIError = Array<{
  field: string;
  message: string;
}>;

export type ApiErrorResponse = {
  message?: string;
  errors?: Record<string, string[] | string>;
};
