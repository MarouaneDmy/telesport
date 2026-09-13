import type { Country, Participation } from "../models/olympic.model";

export const calculateTotalMedals = (country: Country): number => {
  return country.participations.reduce(
    (sum: number, p: Participation) => sum + p.medalsCount,
    0,
  );
};

export const getCountryEvolutionData = (country: Country) => {
  return {
    labels: country.participations.map((p: Participation) => p.year.toString()),
    datasets: [
      {
        label: "Nombre de médailles",
        data: country.participations.map((p: Participation) => p.medalsCount),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };
};
