import type { Country, Participation } from "../models/olympic.model";

export const calculateTotalMedals = (country: Country): number => {
  return country.participations.reduce(
    (sum: number, p: Participation) => sum + p.medalsCount,
    0,
  );
};
