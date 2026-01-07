import { CopyIcon, TrashIcon } from "@phosphor-icons/react";

export function LinkItem() {
    return <div className="flex items-center py-2 gap-4 w-full">
      <div className="flex flex-col gap-1 flex-1">
        <span className="text-blue-base font-bold text-md truncate">
          brev.ly/Portifolio-DEV
        </span>
        <span className="text-gray-500 text-sm truncate">
          devsite.portfolio.com.br/d...
        </span>
      </div>

      <span className="text-gray-500 text-sm w-20 text-right">
        30 acessos
      </span>

      <div className="flex items-center gap-2">
        <button className="bg-gray-200 w-8 h-8 rounded flex items-center justify-center">
          <CopyIcon size={16} />
        </button>
        <button className="bg-gray-200 w-8 h-8 rounded flex items-center justify-center">
          <TrashIcon size={16} />
        </button>
      </div>
    </div>;
  }
