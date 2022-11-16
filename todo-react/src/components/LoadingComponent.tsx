import { ReactNode, FC } from "react";

export const Loading: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className=" text-sm flex h-screen  items-center justify-center">
      {children}
    </div>
  );
};
