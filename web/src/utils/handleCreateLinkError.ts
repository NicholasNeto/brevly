import { toast } from 'react-toastify';
import { API_ERROR_MESSAGES } from "../constants/apiErrorMessages";
import { ApiError } from "../errors/apierror";

export function handleCreateLinkError(error: unknown) {
  if (error instanceof ApiError) {
    // Tradução por code (preferencial)
    if (error.code && API_ERROR_MESSAGES[error.code]) {
      toast.error(API_ERROR_MESSAGES[error.code]);
      return;
    }

    // Fallback por status
    if (error.status === 409) {
      toast.error("Esse link já existe");
      return;
    }

    if (error.status >= 500) {
      toast.error("Erro interno, tente novamente mais tarde");
      return;
    }
  }

  // Fallback final
  toast.error("Erro inesperado");
}
