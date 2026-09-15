import { type FC } from "react";
import { useNavigate } from "react-router-dom";

const NotFound: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-6 p-4 text-center">
      <h1 className="text-8xl font-bold text-gray-700">404</h1>
      <h2 className="text-3xl font-semibold">Page introuvable</h2>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors flex items-center gap-2 group"
      >
        Retour au tableau de bord
      </button>
    </div>
  );
};

export default NotFound;
