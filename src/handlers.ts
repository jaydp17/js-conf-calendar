import { format } from 'date-fns';

import { nextConf as renderNextConf } from './card';
import { get as getData } from './data';
import { nextConf as sayNextConf } from './speak';
import { getImmediateNext } from './utility';

export default {
  LaunchRequest() {
    this.emit('NextConf');
  },

  async NextConf() {
    const confList = await getData();
    const nextConfs = getImmediateNext(confList);
    this.response.speak(sayNextConf(nextConfs)).cardRenderer(process.env.SKILL_NAME, renderNextConf(nextConfs));
    this.emit(':responseReady');
  },

  SessionEndedRequest() {
    // tslint:disable-next-line
    console.log('Session ended with reason: ' + this.event.request.reason);
  },

  'AMAZON.StopIntent'() {
    this.response.speak('Bye');
    this.emit(':responseReady');
  },

  'AMAZON.HelpIntent'() {
    this.response.speak(
      `You can try: 'alexa, open ${process.env.SKILL_NAME}'` +
        ` or 'alexa, ask ${process.env.SKILL_NAME} when's the next conference'`,
    );
    this.emit(':responseReady');
  },

  'AMAZON.CancelIntent'() {
    this.response.speak('Bye');
    this.emit(':responseReady');
  },

  Unhandled() {
    this.response.speak(
      `Sorry, I didn't get that. You can try: 'alexa, ${process.env.SKILL_NAME}'` +
        ` or 'alexa, ask ${process.env.SKILL_NAME} when's the next conference'`,
    );
  },
};
