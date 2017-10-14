import { ConfInfo } from './types';
import { isAfter, min, compareAsc } from 'date-fns';

/**
 * Remove the past conferences and keep only the future ones
 */
function removePast(confList: ConfInfo[]): ConfInfo[] {
  const now = new Date();
  return confList.filter(conf => isAfter(conf.startDate, now));
}

/**
 * Gives the next immediate conference
 */
export function getImmediateNext(confList: ConfInfo[]): ConfInfo {
  const futureConfs = removePast(confList);
  // TODO: what happens if two confs start on the same day
  const sorted = futureConfs.sort((a, b) => compareAsc(a.startDate, b.startDate));
  return sorted[0];
}
