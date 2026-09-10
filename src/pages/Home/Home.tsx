import { useRef, type FC } from "react";
import Header from "../../components/Header";
import type { ICountryDto, Participation } from "../../models/olympic.model";
import { useData } from "../../hooks/useData";
import { getElementsAtEvent, Pie } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import type { Chart } from "chart.js";
import Indicator from "../../components/Indicator";

const Home: FC = () => {
  const navigate = useNavigate();
  const data = useData();
  const chartRef = useRef<Chart<"pie">>(null);

  const handleRedirect = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!chartRef.current) return;

    const index = getElementsAtEvent(chartRef.current, event)[0].index;
    navigate(`/country/${data[index].id}`);
  };

  // Anti-pattern 6 — Logique métier complexe directement dans le composant
  const calculateTotalMedals = (country: ICountryDto) => {
    return country.participations.reduce(
      (sum: number, p: Participation) => sum + p.medalsCount,
      0,
    );
  };

  const totalParticipatingCountries = data ? data.length : 0;
  const totalGamesEditions = 5;

  // Anti-pattern 7 — État de chargement dérivé des données au lieu d'un état dédié (loading/error).
  if (!data) {
    return <div>Chargement...</div>;
  }

  const chartData = {
    labels: data.map((country: ICountryDto) => country.name),
    datasets: [
      {
        label: "Total des médailles",
        data: data.map((country: ICountryDto) => calculateTotalMedals(country)),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "white",
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <Header>Historique des Jeux Olympiques - TéléSport</Header>

        <div className="mb-8">
          <p className="text-lg">
            Bienvenue sur la page dédiée à l'historique des Jeux Olympiques.
            Explorez les performances des pays au fil des années.
          </p>
        </div>

        <div className="mb-2">
          <Indicator
            title="Pays participants"
            value={totalParticipatingCountries}
            color="text-blue-400"
          />
          <Indicator
            title="Éditions des JO"
            value={totalGamesEditions}
            color="text-green-400"
          />
        </div>

        <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
          <div style={{ height: "400px" }}>
            <Pie
              ref={chartRef}
              data={chartData}
              options={chartOptions}
              onClick={handleRedirect}
            />
          </div>
        </div>

        <div className="text-sm text-gray-400">
          <p>Cliquez sur un pays pour voir ses détails</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
