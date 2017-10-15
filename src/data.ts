import axios from 'axios';
import { parse } from 'date-fns';

import { ConfInfo, RawConfInfo } from './types';

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
 * Fetches the data
 */
export async function get(): Promise<ConfInfo[]> {
  const data = await getDataForYear(2017);
  // TODO: fetch for year 2018 as well
  return data.map(toConfInfo);
}
