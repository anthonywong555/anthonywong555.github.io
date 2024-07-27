import type { Log } from '../types';

export interface PuzzleLog extends Log {
  mini: boolean;
  strands: boolean;
  connnections: boolean;
  wordle: boolean;
  crossword: boolean;
}