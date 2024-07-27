import type { Log } from '$lib/base';

export interface BookLog extends Log {
  title: string,
  pages: number;
  isFinish: boolean;
}