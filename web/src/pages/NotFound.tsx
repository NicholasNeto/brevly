import { CenteredBox } from "../components/centeredBox";

export default function NotFound() {
  return (
 <div className="min-h-screen flex items-center justify-center">
      <CenteredBox
        imageSrc="/src/assets/404.svg"
        imageAlt="blalba"
        title="Link não encontrado"
      >
        <div className="flex flex-col">
          <span className="text-gray-500 text-sm mx-auto">
            O link que você está tentando acessar não existe, foi removido ou é uma URL inválida. Saiba mais em{" "}
            <a href="/" className="text-blue-600 underline mx-auto">
              brev.ly.
            </a>
          </span>
        </div>

      </CenteredBox>
    </div>
  );
}

