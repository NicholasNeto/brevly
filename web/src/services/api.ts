import { ApiError } from "../errors/apierror";


const BASE_URL = import.meta.env.VITE_BACKEND_URL;

type ResponseType = "json" | "blob";

interface ApiErrorResponse {
  message?: string;
  code?: string;
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  responseType: ResponseType = "json"
): Promise<T> {
  const headers: HeadersInit = {};

  if (options.body) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const contentType = response.headers.get("Content-Type");

    let body: ApiErrorResponse | string | null = null;

    if (contentType?.includes("application/json")) {
      body = (await response.json()) as ApiErrorResponse;
    } else {
      body = await response.text();
    }

    throw new ApiError(
      typeof body === "string"
        ? body
        : body?.message ?? "Request failed",
      response.status,
      typeof body === "string" ? undefined : body?.code
    );
  }

  // DELETE 204
  if (response.status === 204) {
    return null as T;
  }

  if (responseType === "blob") {
    return (await response.blob()) as T;
  }

  return response.json();
}
