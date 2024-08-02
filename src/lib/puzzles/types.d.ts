import type { Log } from '$lib/base';

export interface PuzzleLog extends Log {
  mini: boolean;
  strands: boolean;
  connections: boolean;
  wordle: boolean;
  crossword: boolean;
}