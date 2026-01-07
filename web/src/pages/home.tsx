import { CopyIcon, TrashIcon, TrayArrowDownIcon } from "@phosphor-icons/react";
import { Title } from "../components/ui/title";
import { LinkItem } from "../components/link-item";

function Home() {
  return (
    <main className="min-h-screen px-4 py-6 flex flex-col gap-6">
      {/* LOGO */}

      <img src="src/assets/logo.svg" alt="Brev.ly" className="w-24 mx-auto md:mx-0" />
      

      {/* CONTAINER PRINCIPAL */}
      <div className="flex flex-col md:flex-row gap-6 md:items-start">
        {/* FORMULÁRIO */}
        <section className="bg-white p-4 rounded-lg flex-1">
          <Title>Novo Link</Title>
          <div className="flex flex-col gap-3">
            <label className="text-sm text-gray-500">Link original</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-3 py-2"
            />

            <label className="text-sm  text-gray-500">Link encurtado</label>

            <span className="border border-gray-300 rounded-md px-3 py-2 text-gray-400">
              brev.ly/
            </span>

            <button className="bg-blue-base text-gray-100 rounded-lg">
              Salvar link
            </button>
          </div>
        </section>

        {/* LISTA */}
        <section className="bg-white p-4 rounded-lg flex-1 px-4">
          <div className="w-full p-3 py-2 flex items-center justify-between">
          <Title>Meus Links</Title>
            <button className="flex items-center justify-center gap-2 bg-gray-200 text-gray-500 text-lg leading-6 rounded px-4 py-2">
              <TrayArrowDownIcon size={20} />
              Baixar CSV
            </button>
          </div>
          {/* Aqui vai a lista de links */}

          <div className=" w-full ">
            <LinkItem />
            <hr className="w-full max-w-516px h-px bg-gray-200 border-0 mx-auto" />

            
          </div>
        </section>
      </div>
    </main>
  );
}

export default Home;
