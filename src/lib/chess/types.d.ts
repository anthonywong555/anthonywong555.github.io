import type { Log } from '$lib/base';

export interface ChessDotComLog extends Log {
  dailyPuzzle: boolean;
  numberOfGames: number;
  studying?: boolean;
}

export interface TheWoodpeckerMethodLog extends Log {
  numberOfExercises: number;
}

export interface ChessLog extends Log {
  // ChessDotComLog
  dailyPuzzle: boolean;
  numberOfGames: number;
  studying?: boolean;

  // TheWoodpeckerMethodLog
  numberOfExercises: number;
}