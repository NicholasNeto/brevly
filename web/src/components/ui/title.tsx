import type { ComponentProps } from "react";

type TitleProps = ComponentProps<"h1">;

export function Title({ children, className, ...props }: TitleProps) {
  return (
    <h1
      {...props}
      className={`text-lg font-bold text-gray-600 mb-4 ${className ?? ""}`}
    >
      {children}
    </h1>
  );
}
