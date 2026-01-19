import { useEffect } from "react";
import { useParams } from "react-router-dom";

const REDIRECT_API_URL = import.meta.env.VITE_BACKEND_URL;


export default function RedirectPage() {
    const { slug } = useParams<{ slug: string }>();
  
    useEffect(() => {
      if (!slug) {
        window.location.replace("/404");
        return;
      }
  
      // Backend valida tudo e redireciona
     // window.location.replace(`${REDIRECT_API_URL}/${slug}`);
    }, [slug]);
  
    return (
    //   <div className="min-h-screen flex col-auto items-center justify-center bg-blue-base">
    //      <img
    //     src="src/assets/logo_icon.svg"
    //     alt="Brev.ly"
    //     className="w-24 mx-auto md:mx-0"
    //   />
    //     <span className="text-gray-600 text-xl">Redirecionando...</span>
    //     <span className="text-gray-500  ">O link será aberto automaticamente em alguns instantes....</span>
    //     <span className="text-gray-500 text-xl">Não foi redirecionado?
    //       <a href="">Acesse aqui</a>  
    //     </span>
    //   </div>

    <div className="min-h-screen flex items-center justify-center">
         <div className="w-145 h-74 flex flex-col gap-6 px-12 py-16 rounded-xl bg-gray-100">
          <img
            src="/src/assets/logo_icon.svg"
            alt="Brev.ly"
            className="w-20 mx-auto"
          />
    
          <span className="text-gray-600 text-xl font-semibold">
            Redirecionando...
          </span>
    
          <span className="text-gray-500">
            O link será aberto automaticamente em alguns instantes.
          </span>
    
          <span className="text-gray-500 text-sm">
            Não foi redirecionado?{" "}
            <a href="#" className="text-blue-600 underline">
              Acesse aqui
            </a>
          </span>
        </div>

    </div>
       
    );
    
  }