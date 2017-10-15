import axios from 'axios';
import { parse } from 'date-fns';

import { RawConfInfo, ConfInfo } from './types';

const range = (start: number, end: number) => Array.from({length: (1 + end - start)}, (v, k) => k + start);

const getUrlForYear = (year: number) =>
  `https://raw.githubusercontent.com/tech-conferences/javascript-conferences/master/conferences/${year}/javascript.json`;

async function getDataForYear(year: number): Promise<RawConfInfo[]> {
  const res = await axios.get(getUrlForYear(year));
  return res.data;
}

function toConfInfo(rawConf: RawConfInfo): ConfInfo {
  return {
    ...rawConf,
    startDate: parse(rawConf.startDate),
    endDate: parse(rawConf.endDate),
  };
}

/**
 * Fetches data for years in given range
 * @param {number} startYear
 * @param {number} endYear
 * @returns {Promise<ConfInfo[]>}
 */
async function getDataForYears(startYear: number, endYear: number): Promise<ConfInfo[]> {
 const yearRange = range(startYear, endYear);
  const rawUnflattenedData: RawConfInfo[][] = await Promise.all(yearRange.map(getDataForYear));
  return [].concat(...rawUnflattenedData).map(toConfInfo);
}

/**
 * Fetches the data
 */
export async function get(): Promise<ConfInfo[]> {
  return await getDataForYears(2017, 2018);
}
