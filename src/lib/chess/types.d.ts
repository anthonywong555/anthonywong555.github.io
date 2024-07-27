import type { Log } from '$lib/base';

export interface ChessDotComLog extends Log {
  dailyPuzzle: boolean;
  numberOfGames: number;
}

export interface TheWoodpeckMethodLog extends Log {
  numberOfExercises: number;
}

export interface ChessLog extends Log {
  dailyPuzzle: boolean;
  numberOfGames: number;
  numberOfExercises: number;
  color?: string;
}