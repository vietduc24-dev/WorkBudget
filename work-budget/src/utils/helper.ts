import { ROUTES } from '@/constants/routes';
import { MESSAGE } from '@/constants/messages';
import type { APIError } from '@/types/common';

type ErrorValue = {
  message?: string;
  status?: number;
  statusCode?: number;
  response?: {
    status?: number;
  };
  errors?: Record<string, Array<string | { message?: string }> | string>;
};

function isErrorValue(error: unknown): error is ErrorValue {
  return typeof error === 'object' && error !== null;
}

export function getObjectError(error: unknown) {
  if (!error) return [];

  // Check for 403 Forbidden status and redirect
  if (!isErrorValue(error)) {
    return [];
  }

  const statusCode =
    error.status || error.response?.status || error.statusCode;
  if (statusCode === 403) {
    if (typeof window !== 'undefined') {
      window.location.href = ROUTES.FORBIDDEN;
    }
    return [];
  }

  if (error) {
    const arrError: APIError = [];

    if (error.errors) {
      const errors = error.errors;
      Object.entries(errors).map(([field, errorArray]) => {
        if (Array.isArray(errorArray) && errorArray.length > 0) {
          errorArray.forEach((error) => {
            const message =
              typeof error === 'string' ? error : error.message;
            if (message) {
              arrError.push({
                field: field,
                message: message,
              });
            }
          });
        } else {
          if (typeof errorArray === 'string') {
            arrError.push({
              field: field,
              message: errorArray,
            });
          } else {
            arrError.push({
              field: field,
              message: MESSAGE.ERROR_SUBMIT_SERVER,
            });
          }
        }
      });
      const newObjectErr: APIError = [];
      arrError.forEach((err) => {
        const checkExistsError = newObjectErr?.find(
          (item) => item?.message === err?.message
        );
        if (!checkExistsError) {
          newObjectErr.push(err);
        }
      });
      return newObjectErr;
    }

    if (error.message) {
      arrError.push({
        field: '',
        message: error.message,
      });
      const newObjectErr: APIError = [];
      arrError.forEach((err) => {
        const checkExistsError = newObjectErr.find(
          (item) => item?.message === err?.message
        );
        if (!checkExistsError) {
          newObjectErr.push(err);
        }
      });
      return newObjectErr;
    }
  }

  return [];
}
export function matchDynamicRoute(
  currentPath: string,
  template: string
): boolean {
  // Chuyển template thành regex: /project/[id]/feedback → ^/project/[^/]+/feedback$
  const regex = new RegExp('^' + template.replace(/\[.*?\]/g, '[^/]+') + '$');
  return regex.test(currentPath);
}
