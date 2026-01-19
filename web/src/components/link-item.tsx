import { useDeleteLink } from "../hooks/useDeleteLink";
import { CopyIcon, TrashIcon } from "@phosphor-icons/react";
import type { LinkItemType } from "../types/linksTypes";
import { copyToClipboard } from "../utils/copyToClipboard";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

interface LinkItemProps {
  link: LinkItemType;
}

export function LinkItem({ link }: LinkItemProps) {
  const deleteLink = useDeleteLink();

  function handlecopyToClipboard() {
    copyToClipboard(`${BASE_URL}/${link.shortUrl}`);
  }

  function handleDelete() {
    if (confirm("Do you really want to delete this link?")) {
      deleteLink.mutate({ id: link.id });
    }
  }

  return (
    <div className="flex items-center py-2 gap-4 w-full">
      <div className="flex flex-col gap-1 flex-1">
        <a
          href={`${BASE_URL}/${link.shortUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-base font-bold text-md truncate"
        >
          {`brev.ly/${link.shortUrl}`}
        </a>

        <a 
          href={`${link.shortUrl}`} 
          // target="_blank" 
          // rel="noopener noreferrer"
        >
          {`brev.ly/${link.shortUrl}`}
        </a>

        <span className="text-gray-500 text-sm truncate">
          {link.originalUrl}
        </span>
      </div>

      <span className="text-gray-500 text-sm w-20 text-right">
        {link.accessCount}
      </span>

      <div className="flex items-center gap-2">
        <button
          className="bg-gray-200 w-8 h-8 rounded flex items-center justify-center"
          onClick={handlecopyToClipboard}
        >
          <CopyIcon size={16} />
        </button>
        <button
          className="bg-gray-200 w-8 h-8 rounded flex items-center justify-center"
          onClick={handleDelete}
        >
          <TrashIcon size={16} />
        </button>
      </div>
    </div>
  );
}
