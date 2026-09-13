import type { FC } from "react";

const ErrorMessage: FC<{ message?: string; retry?: () => void }> = ({
  message = "Impossible de charger les données.",
  retry,
}) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-6 p-4 text-center">
      <p className="text-xl text-red-400 font-semibold max-w-md">{message}</p>

      {retry && (
        <button
          onClick={retry}
          className="px-6 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-all font-medium hover:scale-105"
        >
          Réessayer
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
