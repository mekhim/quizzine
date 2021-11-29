export type User = {
  id?: string;
  image?: string;
  username: string;
  password?: string;
  email: string;
  date?: number;
  stats?: Stats;
  isAdmin?: boolean;
}

export type Stats = {
  exp: number;
  goodAnswers: number;
  totalAnswers: number;
}
