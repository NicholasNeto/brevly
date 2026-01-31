type CenteredBoxProps = {
    imageSrc: string;
    imageAlt?: string;
    title: string;
    children?: React.ReactNode;
  };
  
  export function CenteredBox({
    imageSrc,
    imageAlt,
    title,
    children,
  }: CenteredBoxProps) {
    return (
      <div className="w-145 h-74 flex flex-col gap-6 px-12 py-16 rounded-xl bg-gray-100">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-20 mx-auto"
        />
  
        <span className="text-gray-600 text-xl font-semibold mx-auto">
          {title}
        </span>
  
        <div className="flex flex-col gap-1">
          {children}
        </div>
      </div>
    );
  }
  