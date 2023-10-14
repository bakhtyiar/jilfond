import { AxiosError } from "axios";

export interface IErrorHandlingState {
  errorMessage: string;
}

export function handleError(
  error: unknown,
  state: Partial<IErrorHandlingState>
) {
  if (error instanceof AxiosError && error.response) {
    state.errorMessage = error.response?.data.message || "Произошла ошибка";
  } else if (error instanceof AxiosError && error.request) {
    state.errorMessage = "Ошибка при отправке запроса";
  } else if (error instanceof Error) {
    state.errorMessage = error.message || "Произошла ошибка";
  } else {
    state.errorMessage = "Произошла ошибка";
  }
}
