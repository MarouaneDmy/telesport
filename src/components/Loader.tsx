import type { FC } from "react";

const Loader: FC<{ message?: string }> = ({
  message = "Chargement des données...",
}) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-lg text-gray-400 animate-pulse">{message}</p>
    </div>
  );
};

export default Loader;
