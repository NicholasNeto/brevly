import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CenteredBox } from "../components/centeredBox";

const REDIRECT_API_URL = import.meta.env.VITE_BACKEND_URL;
const SLUG_REGEX = /^[a-zA-Z0-9-_]{3,50}$/;

export default function RedirectPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

useEffect(() => {
    if (!slug || !SLUG_REGEX.test(slug)) {
      navigate("/404", { replace: true });
      return;
    }

    async function validateAndRedirect() {
      try {
        const res = await fetch(`${REDIRECT_API_URL}/${slug}`, {
          method: "HEAD",
        });

        
        if (res.status === 404) {
          navigate("/404", { replace: true });
          return;
        }

        window.location.replace(`${REDIRECT_API_URL}/${slug}`);
      } catch {
        navigate("/404", { replace: true });
      }
    }

    validateAndRedirect();
  }, [slug, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <CenteredBox
        imageSrc="/src/assets/logo_icon.svg"
        imageAlt="blalba"
        title="Redirecionando..."
      >
        <div className="flex flex-col">
          <span className="text-gray-500 mx-auto">
            O link será aberto automaticamente em alguns instantes.
          </span>

          <span className="text-gray-500 text-sm mx-auto">
            Não foi redirecionado?{" "}
            <a href="#" className="text-blue-600 underline">
              Acesse aqui
            </a>
          </span>
        </div>
      </CenteredBox>
    </div>
  );
}
