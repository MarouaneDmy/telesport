export interface Participation {
  id: number;
  year: number;
  city: string;
  medalsCount: number;
  athleteCount: number;
}

export interface Country {
  id: number;
  name: string;
  participations: Participation[];
}