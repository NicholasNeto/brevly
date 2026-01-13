const BASE_URL = import.meta.env.VITE_BACKEND_URL;

if (!BASE_URL) {
    throw new Error("VITE_BACKEND_URL não está definida")
}
  

// export async function apiFetch<T>(
//   path: string,
//   options?: RequestInit
// ): Promise<T> {
//   const response = await fetch(`${BASE_URL}${path}`, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//     ...options,
//   });

//   if (!response.ok) {
//     const error = await response.text();
//     throw new Error(error);
//   }

//   return response.json();
// }


export async function apiFetch<T>(
    path: string,
    options: RequestInit = {}
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
      const text = await response.text();
      throw new Error(text || "Request failed");
    }
  
    // DELETE 204 não tem body
    if (response.status === 204) {
      return null as T;
    }
  
    return response.json();
  }