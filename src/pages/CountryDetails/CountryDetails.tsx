import type { FC } from "react";
import Header from "../../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useData } from "../../hooks/useData";
import type { Country, Participation } from "../../models/olympic.model";
import { Line } from "react-chartjs-2";
import Indicator from "../../components/Indicator";

const CountryDetails: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const olympicsData = useData();

  const country: Country = olympicsData.find(
    (c: Country) => c.id === Number(id),
  );

  if (!country) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Pays introuvable :(</h2>
        <button
          onClick={() => navigate("/")}
          className="text-blue-400 hover:underline cursor-pointer"
        >
          Retourner à l'accueil
        </button>
      </div>
    );
  }

  const totalMedals = country.participations.reduce(
    (sum: number, p: Participation) => sum + p.medalsCount,
    0,
  );
  const totalAthletes = country.participations.reduce(
    (sum: number, p: Participation) => sum + p.athleteCount,
    0,
  );
  const totalParticipations = country.participations.length;

  // Anti-pattern 10 — Préparation des données du graphique dans le composant — extraire dans une fonction ou un hook pour séparer UI et logique. https://react.dev/learn/thinking-in-react
  const evolutionData = {
    labels: country.participations.map((p: Participation) => p.year.toString()),
    datasets: [
      {
        label: "Nombre de médailles",
        data: country.participations.map((p: Participation) => p.medalsCount),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.3,
      },
    ],
  };

  const evolutionOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "white",
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      x: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="text-gray-400 hover:text-white cursor-pointer mb-3"
        >
          Retour
        </button>

        <Header>{country.name}</Header>

        <div className="mb-2">
          <Indicator
            title="Participations"
            value={totalParticipations}
            color="text-blue-400"
          />
          <Indicator
            title="Total médailles"
            value={totalMedals}
            color="text-yellow-400"
          />
          <Indicator
            title="Total athlètes"
            value={totalAthletes}
            color="text-green-400"
          />
        </div>

        <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
          <div style={{ height: "400px" }}>
            <Line data={evolutionData} options={evolutionOptions} />
          </div>
        </div>

        <div className="text-sm text-gray-400">
          <p>Données des 5 dernières éditions des Jeux Olympiques</p>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
