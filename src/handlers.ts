import { format } from 'date-fns';

import { get as getData } from './data';
import { getImmediateNext } from './utility';
import { nextConf as sayNextConf } from './speak';
import { nextConf as renderNextConf } from './card';

export default {
  LaunchRequest: function() {
    this.emit('NextConf');
  },
  NextConf: async function() {
    const confList = await getData();
    const nextConfs = getImmediateNext(confList);
    this.response.speak(sayNextConf(nextConfs)).cardRenderer(process.env.SKILL_NAME, renderNextConf(nextConfs));
    this.emit(':responseReady');
  },
  SessionEndedRequest: function() {
    console.log('Session ended with reason: ' + this.event.request.reason);
  },
  'AMAZON.StopIntent': function() {
    this.response.speak('Bye');
    this.emit(':responseReady');
  },
  'AMAZON.HelpIntent': function() {
    this.response.speak(
      `You can try: 'alexa, open ${process.env.SKILL_NAME}'` +
        ` or 'alexa, ask ${process.env.SKILL_NAME} when's the next conference'`,
    );
    this.emit(':responseReady');
  },
  'AMAZON.CancelIntent': function() {
    this.response.speak('Bye');
    this.emit(':responseReady');
  },
  Unhandled: function() {
    this.response.speak(
      `Sorry, I didn't get that. You can try: 'alexa, ${process.env.SKILL_NAME}'` +
        ` or 'alexa, ask ${process.env.SKILL_NAME} when's the next conference'`,
    );
  },
};
