import type { Log } from '$lib/base';

export interface ChineseLog extends Log {
  isReview: boolean; // Did you use Anki / SRS to Review
  isLearn: boolean; // Did you learn a new topic?
}