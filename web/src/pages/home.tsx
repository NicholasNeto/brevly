import { Link, TrayArrowDownIcon, Warning } from "@phosphor-icons/react";
import { Title } from "../components/ui/title";
import { LinkItem } from "../components/link-item";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, toast } from "react-toastify";
import {
  createLinkSchema,
  type CreateLinkFormData,
} from "../schemas/link-schema";
import { useLinks } from "../hooks/useLinks";
import { useCreateLink } from "../hooks/useCreateLink";
import { useDownloadLinksCsv } from "../hooks/useDownloadLinksCsv";
import { handleCreateLinkError } from "../utils/handleCreateLinkError";
import { TopLoadingBar } from "../components/topLoadingBar";
import { useState } from "react";
import { Spinner } from "../components/ui/spinner";

function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateLinkFormData>({
    resolver: zodResolver(createLinkSchema),
  });

  const { download } = useDownloadLinksCsv();
  const [isDownloading, setIsDownloading] = useState(false);

  const { data: links, isLoading: isLoadingLinks } = useLinks();
  const createLink = useCreateLink();

  const onSubmit = async (data: CreateLinkFormData) => {
    try {
      await createLink.mutateAsync(data);
      reset();
      toast.success("Link criado com sucesso!");
    } catch (err) {
      handleCreateLinkError(err);
    }
  };

  const downloadLinks = async () => {
    try {
      setIsDownloading(true);
      download();
    } catch (error) {
      console.error(error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <main className="min-h-screen px-4 py-6 flex flex-col gap-6">
      <img
        src="src/assets/logo.svg"
        alt="Brev.ly"
        className="w-24 mx-auto md:mx-0"
      />

      <div className="flex flex-col md:flex-row gap-6 md:items-start">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 flex-1">
          <section className="bg-white p-4 rounded-lg flex flex-col gap-4 ">
            <Title>Novo link</Title>

            <div className="flex flex-col gap-1">
              <label
                className={`text-sm ${
                  errors.originalUrl ? "text-red-500" : "text-gray-500"
                }`}
              >
                Link original
              </label>

              <input
                type="text"
                {...register("originalUrl")}
                className={`
                  rounded-md px-3 py-2 text-gray-600
                  focus:outline-none focus:ring-2
                  ${
                    errors.originalUrl
                      ? "border border-red-500 focus:ring-red-500"
                      : "border border-gray-300 focus:ring-blue-base"
                  }
                `}
                placeholder="https://exemplo.com"
              />

              {errors.originalUrl && (
                <span className="flex items-center gap-1 text-sm text-gray-600">
                  <Warning size={16} className="text-red-500" />
                  {errors.originalUrl.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label
                className={`text-sm ${
                  errors.shortUrl ? "text-red-500" : "text-gray-500"
                }`}
              >
                Link encurtado
              </label>

              <div
                className={`
      flex items-center rounded-md px-3
      focus-within:ring-2
      ${
        errors.shortUrl
          ? "border border-red-500 focus-within:ring-red-500"
          : "border border-gray-300 focus-within:ring-blue-base"
      }
    `}
              >
                <span className="text-gray-400 text-sm select-none mr-1">
                  brev.ly/
                </span>

                <input
                  type="text"
                  {...register("shortUrl")}
                  className="flex-1 py-2 text-gray-600 bg-transparent focus:outline-none"
                />
              </div>

              {errors.shortUrl && (
                <span className="flex items-center gap-1 text-sm text-gray-600">
                  <Warning size={16} className="text-red-500" />
                  {errors.shortUrl.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-base text-white rounded-lg py-2 font-medium hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed
      "
            >
              {isSubmitting ? "Salvando..." : "Salvar link"}
            </button>
          </section>
        </form>

        <section className="relative bg-white p-4 rounded-lg flex-1 px-4">
          <TopLoadingBar isLoading={isLoadingLinks} />

          <div className="w-full p-3 py-2 flex items-center justify-between">
            <Title>Meus Links</Title>

            <button
              className="flex items-center justify-center gap-2 bg-gray-200 text-gray-500 text-lg rounded px-3 py-2 disabled:opacity-60"
              onClick={downloadLinks}
              disabled={isDownloading}
            >
              {isDownloading ? <Spinner /> : <TrayArrowDownIcon size={20} />}

              {isDownloading ? "Baixando..." : "Baixar CSV"}
            </button>
          </div>

          <div className="w-full">
            {isLoadingLinks ? (
              <div className="py-10 flex flex-col items-center justify-center text-gray-400 text-sm gap-2">
                <Spinner />
                Carregando links...
              </div>
            ) : links && links.length > 0 ? (
              links.map((link) => <LinkItem key={link.id} link={link} />)
            ) : (
              <div className="w-full py-10 flex flex-col items-center justify-center gap-3">
                <Link className="text-gray-400" size={32} />
                <span className="text-xs text-gray-500 text-center">
                  AINDA NÃO EXISTEM LINKS CADASTRADOS
                </span>
              </div>
            )}
          </div>
        </section>
      </div>
      <ToastContainer />
    </main>
  );
}

export default Home;
