import { useCallback, useState } from "react";
import { apiFetch } from "../services/api";


export function useDownloadLinksCsv() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const download = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
  
      const blob = await apiFetch<Blob>(
        "/links/download",
        { method: "GET" },
        "blob"
      );
      
      const url = window.URL.createObjectURL(blob);
  
      const a = document.createElement("a");
      a.href = url;
      a.download = "links.csv";
      document.body.appendChild(a);
      a.click();
  
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setError("Não foi possível fazer o download");
    } finally {
      setLoading(false);
    }
  }, []);
  

  return {
    download,
    loading,
    error,
  };
}
