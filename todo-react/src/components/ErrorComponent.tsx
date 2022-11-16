import { BackBtn } from "./BackButton";

export const Error = ({ message }: { message: string }) => {
  return (
    <div className="bg-black h-screen w-screen font-sans text-white text-sm flex  items-center justify-center">
      <BackBtn dark />
      <span className="text-xl font-bold ">404</span>{" "}
      <span className="w-px h-10 bg-white mx-2"></span>
      {message}
    </div>
  );
};
