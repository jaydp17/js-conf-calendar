import { format } from 'date-fns';

import { ConfInfo } from './types';

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
  return format(date, 'Do MMMM YYYY');
}
function formatAddress(conf: ConfInfo) {
  return `${conf.city}, ${conf.country}`;
}

function noConfFound() {
  return 'uh oh,looks like there are no more conferences';
}

function singleConf(conf: ConfInfo) {
  return `The next conference is ${conf.name} at ${formatDate(conf.startDate)} in ${formatAddress(conf)}`;
}

function multiConfSingleLIne(conf: ConfInfo, index: number) {
  return `${index + 1}) ${conf.name} in ${formatAddress(conf)}`;
}

function multiConf(confList: ConfInfo[]) {
  return [
    `There are ${confList.length} conferences on ${formatDate(confList[0].startDate)}`,
    ...confList.map(multiConfSingleLIne),
  ].join('\n');
}
