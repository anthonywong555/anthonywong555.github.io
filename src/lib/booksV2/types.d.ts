import type { Log } from '../types';

export interface BookLog extends Log {
  title: string,
  pages: number;
  isFinish: boolean;
}