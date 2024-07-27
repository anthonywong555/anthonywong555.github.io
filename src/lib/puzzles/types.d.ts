import type { Log } from '$lib/base';

export interface PuzzleLog extends Log {
  mini: boolean;
  strands: boolean;
  connnections: boolean;
  wordle: boolean;
  crossword: boolean;
}