import { format } from 'date-fns';
import * as R from 'ramda';

import { ConfInfo } from './types';

/**
 * main function to speak out next conference results
 */
export function nextConf(confList: ConfInfo[]): string {
  if (confList.length === 0) {
    return noConfFound();
  }
  if (confList.length === 1) {
    return singleConf(confList[0]);
  }
  if (confList.length > 1) {
    return multiConf(confList);
  }
}

function formatDate(date: Date) {
  return `<say-as interpret-as="date">${format(date, 'YYYYMMDD')}</say-as>`;
}
function formatAddress(conf: ConfInfo) {
  return `<say-as interpret-as="address">${conf.city}, ${conf.country}</say-as>`;
}

function wrapSentence(line: string) {
  return `<s>${line}</s>`;
}

function noConfFound() {
  return '<say-as interpret-as="interjection">uh oh,</say-as> looks like there are no more conferences';
}

function singleConf(conf: ConfInfo) {
  return `The next conference is ${conf.name} at ${formatDate(conf.startDate)} in ${formatAddress(conf)}`;
}

function multiConfSingleLIne(conf: ConfInfo, index: number) {
  return `${index + 1}) ${conf.name} in ${formatAddress(conf)}`;
}

function multiConf(confList: ConfInfo[]) {
  const lines = [
    `There are ${confList.length} conferences on ${formatDate(confList[0].startDate)}`,
    ...confList.map(multiConfSingleLIne),
  ];
  return R.pipe(R.map(wrapSentence), R.join(' '))(lines);
}
