import { ConfInfo } from './types';
import { isAfter, min, compareAsc, isEqual } from 'date-fns';
import * as R from 'ramda';

/**
 * Remove the past conferences and keep only the future ones
 */
function removePast(confList: ConfInfo[]): ConfInfo[] {
  const now = new Date();
  return confList.filter(conf => isAfter(conf.startDate, now));
}

/**
 * Gives the next immediate conferences
 * It tries to give the conference that's coming up first
 * But if there are more than 1 confs on the same day, it'll return all
 */
export function getImmediateNext(confList: ConfInfo[]): ConfInfo[] {
  const byStartDate = (a: ConfInfo, b: ConfInfo) => compareAsc(a.startDate, b.startDate);
  const sortedConfs = R.pipe(removePast, R.sort(byStartDate))(confList);
  if (sortedConfs.length === 0) return [];

  const { startDate: nextConfDate } = sortedConfs[0];
  const byFirstStartDate = (conf: ConfInfo) => isEqual(conf.startDate, nextConfDate);
  return sortedConfs.filter(byFirstStartDate);
}
